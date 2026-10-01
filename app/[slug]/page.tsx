import { NotionAPI } from 'notion-client';
import NotionRendererView from '../NotionRendererView';

export const revalidate = 3600;
const notionX = new NotionAPI();

// 1. 型別宣告 params 為 Promise
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  // 2. 關鍵：必須先 await 解開 params，否則 slug 會變成 undefined
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const pageId = await getPageIdFromYourDatabase(slug);

  if (!pageId) {
    return <div className="text-center py-20">找不到文章，程式讀取到的目標 slug 是：{slug}</div>;
  }

  const recordMap = await notionX.getPage(pageId);
  return <NotionRendererView recordMap={recordMap} />;
}

async function getPageIdFromYourDatabase(slug: string) {
  try {
    const response = await fetch(
      `https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}/query`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filter: {
            and: [
              // 3. 現在 slug 是一個真實的字串，Notion 就能精準過濾了
              { property: 'slug', rich_text: { equals: slug } },
              { property: 'status', select: { equals: 'Published' } },
              { property: 'type', select: { equals: 'Post' } }
            ]
          }
        }),
        next: { revalidate: 3600 }
      }
    );

    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].id;
    }
    return null;
  } catch (error) {
    console.error("Fetch API Error:", error);
    return null;
  }
}