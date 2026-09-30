import { Client } from '@notionhq/client';
import Link from 'next/link';

// 每一小時自動更新
export const revalidate = 3600;

export default async function HomePage() {
  // 1. 去你的 Notion 資料庫撈出所有「已發布」的文章
  const posts = await getPublishedPosts();

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Abby's Journey</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <Link 
            key={post.id} 
            href={`/post/${post.slug}`} 
            className="block border rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 text-sm mb-4">{post.date}</p>
            {post.summary && (
              <p className="text-gray-700">{post.summary}</p>
            )}
            
            {/* 顯示分類標籤 */}
            <div className="mt-4 flex flex-wrap gap-2">
              {post.category && (
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {post.category}
                </span>
              )}
              {post.tags.map(tag => (
                <span key={tag} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// 將資料庫查詢邏輯抽出來
// @ts-ignore
async function getPublishedPosts() {
  try {
    // 官方 API：用來查 ID
    const notion = new Client({ auth: process.env.NOTION_TOKEN });
    const response = await (notion.databases as any).query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        and: [
          { property: 'status', select: { equals: 'Published' } },
          { property: 'type', select: { equals: 'Post' } }
        ]
      },
      sorts: [
        {
          property: 'date',
          direction: 'descending', // 新文章排前面
        },
      ],
    });

    // 將 Notion 的複雜資料結構，整理成我們前端好用的陣列
    return response.results.map((page: any) => {
      // 下面這些 properties 的名稱 (title, summary, slug, category, tags, date) 
      // 必須跟你 Notion 資料庫裡面的「欄位名稱」完全一致（區分大小寫）！
      return {
        id: page.id,
        title: page.properties.title?.title[0]?.plain_text || '無標題',
        slug: page.properties.slug?.rich_text[0]?.plain_text || '',
        summary: page.properties.summary?.rich_text[0]?.plain_text || '',
        category: page.properties.category?.select?.name || '',
        tags: page.properties.tags?.multi_select?.map((tag: any) => tag.name) || [],
        date: page.properties.date?.date?.start || '',
      };
    });
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
}