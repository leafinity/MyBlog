import { NotionAPI } from 'notion-client';
import NotionRendererView from '../NotionRendererView';

// 強制關閉快取，確保每次重新整理都會去抓資料並印出 console.log
export const revalidate = 0;

const notionX = new NotionAPI();

export default async function PostPage({ params }: { params: { slug: string } }) {
  const pageId = await getPageIdFromYourDatabase(params.slug);

  if (!pageId) {
    return <div className="text-center py-20">找不到這篇文章... (請去 Vercel Logs 查看原因)</div>;
  }

  const recordMap = await notionX.getPage(pageId);
  return <NotionRendererView recordMap={recordMap} />;
}

async function getPageIdFromYourDatabase(slug: string) {
  try {
    const targetSlug = decodeURIComponent(slug);
    console.log("網頁傳進來的目標 slug:", `"${targetSlug}"`);

    const response = await fetch(
      `https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}/query`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}), 
        cache: 'no-store' 
      }
    );

    if (!response.ok) return null;

    const data = await response.json();
    console.log(`資料庫總共回傳了 ${data.results?.length} 篇文章`);

    const matchPage = data.results.find((page: any) => {
      const pageSlug = page.properties.slug?.rich_text[0]?.plain_text;
      return pageSlug === targetSlug;
    });

    if (matchPage) {
      console.log("成功比對到文章！ID 是:", matchPage.id);
      return matchPage.id;
    } else {
      console.log("JavaScript 找遍了全部文章，還是沒有吻合的 slug");
      return null;
    }
  } catch (error) {
    console.error("查詢發生錯誤:", error);
    return null;
  }
}