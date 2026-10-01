import { NotionAPI } from 'notion-client';
import NotionRendererView from '../NotionRendererView';

// 確保 Vercel 永遠去抓最新資料
export const revalidate = 0;
const notionX = new NotionAPI();

export default async function PostPage({ params }: { params: { slug: string } }) {
  // 擋掉瀏覽器偷偷發出的 favicon 請求，避免干擾除錯
  if (params.slug === 'favicon.ico') return null;

  const pageId = await getPageIdFromYourDatabase(params.slug);

  if (!pageId) {
    // 這裡我們直接把網址傳進來的 slug 印在畫面上，讓你一眼看穿有沒有抓錯字
    return <div className="text-center py-20">找不到這篇文章，目前尋找的目標是：{params.slug}</div>;
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
              { property: 'type', select: { equals: 'Post' } }
            ]
          }
        }),
        // 這是最關鍵的一行！強迫 Next.js 絕對不可以使用之前權限錯誤時留下的快取
        cache: 'no-store'
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