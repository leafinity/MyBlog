import { Client } from '@notionhq/client';
import NotionRendererView from '../NotionRendererView'; // 確認相對路徑只有一層 ../

export const revalidate = 3600; 

// 1. 正確初始化官方 API (用來查 ID)
const notion = new Client({ auth: process.env.NOTION_TOKEN });

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  // 2. 用官方 API 查出這篇 slug 對應的真實 Page ID
  const pageId = await getPageIdFromYourDatabase(slug);

  if (!pageId) {
    return <div className="text-center py-20 text-2xl font-bold">找不到這篇文章...</div>;
  }

  // 3. 把查到的 ID 交給底下的渲染器畫出畫面
  return <NotionRendererView pageId={pageId} />;
}

async function getPageIdFromYourDatabase(slug: string) {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        and: [
          {
            property: 'slug',
            rich_text: {
              equals: slug,
            },
          },
          {
            property: 'status',
            select: {
              equals: 'Published',
            },
          },
          {
            property: 'type',
            select: {
              equals: 'Post',
            },
          }
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