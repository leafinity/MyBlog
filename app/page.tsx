import Link from 'next/link';

export default async function HomePage() {
  const posts = await getPublishedPosts();

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Abby's Journey</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post: any) => (
          <Link 
            key={post.id} 
            href={`/${post.slug}`} 
            className="block border rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 text-sm mb-4">{post.date}</p>
            {post.summary && <p className="text-gray-700">{post.summary}</p>}
          </Link>
        ))}
      </div>
    </div>
  );
}

async function getPublishedPosts() {
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
              { property: 'status', select: { equals: 'Published' } },
              { property: 'type', select: { equals: 'Post' } }
            ]
          },
          sorts: [{ property: 'date', direction: 'descending' }]
        }),
        // 利用 Next.js 內建的快取，每小時重新抓取一次
        next: { revalidate: 3600 } 
      }
    );

    if (!response.ok) {
      throw new Error(`API 錯誤: ${response.status}`);
    }

    const data = await response.json();

    return data.results.map((page: any) => ({
      id: page.id,
      title: page.properties.title?.title[0]?.plain_text || '無標題',
      slug: page.properties.slug?.rich_text[0]?.plain_text || '',
      summary: page.properties.summary?.rich_text[0]?.plain_text || '',
      date: page.properties.date?.date?.start || '',
    }));
  } catch (error) {
    console.error("抓取失敗:", error);
    return [];
  }
}