import { NotionAPI } from 'notion-client';
import NotionRendererView from '../NotionRendererView';

export const revalidate = 3600;

// 建立第二棒選手 (專門抓完整圖文內容)
const notionX = new NotionAPI();

export default async function PostPage({ params }: { params: { slug: string } }) {
  // 第一棒：去問官方資料庫，這篇文章的 ID 是多少？
  const pageId = await getPageIdFromYourDatabase(params.slug);

  if (!pageId) {
    return <div className="text-center py-20">找不到這篇文章...</div>;
  }

  // 第二棒：拿到 ID 了，叫 notionX 去把這整頁的圖文內容 (recordMap) 抓回來
  const recordMap = await notionX.getPage(pageId);

  // 把豐富的內容丟給畫面元件去畫
  return <NotionRendererView recordMap={recordMap} />;
}

// 第一棒的實作細節 (純原生 fetch，絕不當機)
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
              // { property: 'status', select: { equals: 'Published' } },
              // { property: 'type', select: { equals: 'Post' } }
            ]
          }
        }),
        next: { revalidate: 3600 }
      }
    );

    if (!response.ok) return null;

    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].id; // 成功找到 ID！
    }
    return null;
  } catch (error) {
    console.error("查無此文章:", error);
    return null;
  }
}