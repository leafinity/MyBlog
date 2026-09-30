import { Client } from '@notionhq/client';
import { NotionAPI } from 'notion-client';
import NotionRendererView from '../NotionRendererView';

export const revalidate = 3600; 

// 非官方 API：用來抓文章完整內容與圖片
const notionX = new NotionAPI();

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  const pageId = await getPageIdFromYourDatabase(slug);

  if (!pageId) {
    return <div className="text-center py-20 text-2xl font-bold">找不到這篇文章...</div>;
  }

  // 用查到的 pageId 抓取完整的 recordMap
  const recordMap = await notionX.getPage(pageId);

  // 將 recordMap 傳給你的渲染元件
  return <NotionRendererView recordMap={recordMap} />;
}

async function getPageIdFromYourDatabase(slug: string) {
  try {
    // 官方 API：用來查 ID
    const notion = new Client({ auth: process.env.NOTION_TOKEN });
    // 加上 as any 解決 TS 報錯
    const response = await (notion.databases as any).query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        and: [
          { property: 'slug', rich_text: { equals: slug } },
          { property: 'status', select: { equals: 'Published' } },
          { property: 'type', select: { equals: 'Post' } }
        ]
      },
    });

    if (response.results.length > 0) {
      return response.results[0].id;
    }
    return null;
  } catch (error) {
    console.error("Failed to query database for slug:", error);
    return null;
  }
}