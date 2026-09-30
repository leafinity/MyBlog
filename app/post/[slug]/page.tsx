import { NotionAPI } from 'notion-client';
import { Client } from '@notionhq/client';
import NotionRendererView from '../../../NotionRendererView';

export const revalidate = 3600; // 每一小時自動更新一次 Notion 的修改

const notionRenderer = new NotionAPI();
const notionDb = new Client({ auth: process.env.NOTION_TOKEN });

export default async function PostPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  
  const pageId = await getPageIdFromYourDatabase(slug);

  if (!pageId) {
    return <div className="text-center py-20">找不到這篇文章：{slug}</div>;
  }

  try {
    const recordMap = await notionRenderer.getPage(pageId);
    return (
      <article>
        <NotionRendererView recordMap={recordMap} />
      </article>
    );
  } catch (error) {
    return <div className="text-center py-20">文章讀取失敗</div>;
  }
}

async function getPageIdFromYourDatabase(slug: string) {
  try {
    const response = await notionDb.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        // 注意：請確認你在 NotionNext 資料庫裡，設定網址的那個欄位名稱是不是叫 "Slug"
        property: 'Slug', 
        rich_text: {
          equals: slug,
        },
      },
    });

    if (response.results.length > 0) {
      return response.results[0].id;
    }
    return null;
  } catch (error) {
    console.error("Database query failed:", error);
    return null;
  }
}