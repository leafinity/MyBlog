import { NotionAPI } from 'notion-client';
import NotionRendererView from '../../components/NotionRendererView';

export const revalidate = 3600;
const notionX = new NotionAPI();

// posts or pages
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
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
              { property: 'slug', rich_text: { equals: slug } },
              { property: 'status', select: { equals: 'Published' } },
              or: [
                { property: 'type', select: { equals: 'Post' } },
                { property: 'type', select: { equals: 'Page' } }
              ]
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