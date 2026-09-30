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
        and: [
          {
            property: 'slug', // 條件一：網址要完全符合
            rich_text: {
              equals: slug,
            },
          },
          {
            property: 'status', // 條件二：必須是已發布，防止草稿被偷看
            select: {
              equals: 'Published',
            },
          },
          {
            property: 'type', // 條件三：確保它是文章 (Post)
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
    console.error("Database query failed:", error);
    return null;
  }
}