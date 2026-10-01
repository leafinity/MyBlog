// lib/notion.ts

// 獲取首頁的文章列表
export async function getPublishedPosts() {
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
        next: { revalidate: 3600 } 
      }
    );

    if (!response.ok) return [];

    const data = await response.json();
    return data.results.map((page: any) => ({
      id: page.id,
      title: page.properties.title?.title[0]?.plain_text || '無標題',
      slug: page.properties.slug?.rich_text[0]?.plain_text || '',
      summary: page.properties.summary?.rich_text[0]?.plain_text || '',
      date: page.properties.date?.date?.start || '',
      imageUrl: getPostCoverUrl(page),
      category: page.properties.category?.select?.name || '',
      tags: page.properties.tags?.multi_select?.map((tag: any) => tag.name) || []
    }));
  } catch (error) {
    console.error("抓取列表失敗:", error);
    return [];
  }
}

export async function getPostsByCategory(category: string) {
  const allPosts = await getPublishedPosts();
  return allPosts.filter((post: any) => post.category === category);
}

export async function getPostsByTag(tag: string) {
  const allPosts = await getPublishedPosts();
  return allPosts.filter((post: any) => post.tags?.includes(tag));
}


// 獲取單篇文章的真實 ID (給 [slug]/page.tsx 用的)
export async function getPageIdFromYourDatabase(slug: string) {
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
        cache: 'no-store'
      }
    );

    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].id;
    }
    return null;
  } catch (error) {
    console.error("抓取單篇 ID 失敗:", error);
    return null;
  }
}

function getPostCoverUrl(post: any): string {
  let imageUrl = '';

  const customCover = post?.properties?.cover?.files?.[0];
  if (customCover) {
    imageUrl = customCover.file?.url || customCover.external?.url || '';
  }

  // 如果沒有放圖片，給一張預設圖避免破版
  return imageUrl || '/default-cover.jpg';
}