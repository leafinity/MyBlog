// lib/notion.ts

// 建立 database 對應表
const zhDatabaseID = process.env.NOTION_DATABASE_ID!
const enDatabaseID = process.env.NOTION_DATABASE_EN_ID!
const galleryAlbumsDbID = process.env.NOTION_GALLERY_ALBUMS_DB_ID!;
const galleryPhotosDbID = process.env.NOTION_GALLERY_PHOTOS_DB_ID!;

const dbMap: Record<string, string> = {
  'zh': zhDatabaseID,
  'en': enDatabaseID,
  'gallery-albums': galleryAlbumsDbID,
  'gallery-photos': galleryPhotosDbID,
};

type DatabaseType = 'zh' | 'en' | 'gallery-albums' | 'gallery-photos';

// 獲取首頁的文章列表
export async function getPublishedPosts(lang: 'zh' | 'en' = 'zh') {
  const results = await queryNotionDatabase(
    {
      and: [
        { property: 'status', select: { equals: 'Published' } },
        { property: 'type', select: { equals: 'Post' } }
      ]
    },
    [{ property: 'date', direction: 'descending' }],
    lang
  );

  // 2. 將回傳結果 Mapping 成你要的格式
  return results.map((page: any) => ({
    id: page.id,
    title: page.properties.title?.title[0]?.plain_text || '無標題',
    slug: page.properties.slug?.rich_text[0]?.plain_text || '',
    summary: page.properties.summary?.rich_text[0]?.plain_text || '',
    date: page.properties.date?.date?.start || '',
    imageUrl: getPostCoverUrl(page),
    category: page.properties.category?.select?.name || '',
    tags: page.properties.tags?.multi_select?.map((tag: any) => tag.name) || []
  }));
}

export async function getPostsByCategory(category: string) {
  const allPosts = await getPublishedPosts();
  return allPosts.filter((post: any) => post.category === category);
}

export async function getPostsByTag(tag: string) {
  const allPosts = await getPublishedPosts();
  return allPosts.filter((post: any) => post.tags?.includes(tag));
}

export async function getPostBySlug(slug: string, lang: 'zh' | 'en' = 'zh') {
  const results = await queryNotionDatabase(
    {
      and: [
        { property: 'slug', rich_text: { equals: slug } },
        { property: 'status', select: { equals: 'Published' } },
      ]
    },
    undefined,
    lang
  );

  if (results.length === 0) return null;

  const page = results[0];
  return {
    id: page.id,
    title: page.properties.title?.title[0]?.plain_text || '無標題',
    date: page.properties.date?.date?.start || '',
    tags: page.properties.tags?.multi_select?.map((tag: any) => tag.name) || [],
    type: page.properties.type?.select?.name || 'Unknown',
    summary: page.properties.summary?.rich_text[0]?.plain_text || '',
    imageUrl: getPostCoverUrl(page),
  };
}

export async function getAlbums() {
  const results = await queryNotionDatabase(
    { property: 'status', select: { equals: 'Published' } },
    [{ property: 'date', direction: 'descending' }],
    'gallery-albums'
  );

  return results.map((page: any) => ({
    slug: page.properties.slug?.title[0]?.plain_text || '',
    titleZH: page.properties.title_zh?.rich_text[0]?.plain_text || '',
    titleEN: page.properties.title_en?.rich_text[0]?.plain_text || '',
    coverUrl: page.properties.cover?.url || '',
    date: page.properties.date?.date?.start,
  }));
}

export async function getPhotosByAlbum(tripSlug: string) {
  const results = await queryNotionDatabase(
    {
      and: [
        { property: 'Trip_Slug', select: { equals: tripSlug } }
      ]
    },
    undefined,
    'gallery-photos'
  );

  return results.map((page: any) => ({
    url: page.properties.Photo_URL?.url || page.properties.Photo_URL?.rich_text[0]?.plain_text || '',
  }));
}

async function queryNotionDatabase(filter: any, sorts?: any[], dbType: DatabaseType = 'zh') {

  const targetDbId = dbMap[dbType];
  
  try {
    const body: any = { filter };
    if (sorts) {
      body.sorts = sorts;
    }

    const response = await fetch(
      `https://api.notion.com/v1/databases/${targetDbId}/query`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        next: { 
          revalidate: 3600,
          tags: [`notion-database-${lang}`],
        }
      }
    );

    if (!response.ok) {
      console.error("Notion API 請求失敗:", response.status, response.statusText);
      return [];
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("抓取資料庫失敗:", error);
    return [];
  }
}

function getPostCoverUrl(post: any): string {
  const cloudinaryUrl = post?.properties?.cover_url?.url;
  if (cloudinaryUrl) {
    return cloudinaryUrl;
  }

  // Fallback: 沒填就讀原本的 cover (Files & media 屬性)
  const customCover = post?.properties?.cover?.files?.[0];
  if (customCover) {
    const fallbackUrl = customCover.file?.url || customCover.external?.url;
    if (fallbackUrl) return fallbackUrl;
  }

  return '/default-cover.jpg';
}
