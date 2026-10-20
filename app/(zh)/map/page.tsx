import { getAlbums, getPublishedPosts } from '../../../lib/notion';
import ClientJourneyMap from '../../../components/ClientJourneyMap';

export const revalidate = 3600;

export default async function MapPage() {
  const albums = await getAlbums();
  const posts = await getPublishedPosts();

  console.log("相簿：", validAlbums);
  console.log("文章：", validPosts);

  return (
    <main className="max-w-[1400px] mx-auto px-6 py-12 md:py-20">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-950 mb-4 inline-block">
          足跡地圖
        </h1>
        <div className="w-12 h-1 bg-brand-pink-main rounded-full"></div>
      </div>

      <ClientJourneyMap albums={albums} posts={posts} lang="zh" />
    </main>
  );
}