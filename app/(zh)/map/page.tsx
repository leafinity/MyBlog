import { getAlbums, getPublishedPosts } from '@/lib/notion';
import dynamic from 'next/dynamic';

// 動態引入 JourneyMap，並關閉 SSR 伺服器端渲染
const JourneyMap = dynamic(() => import('@/components/JourneyMap'), {
  ssr: false,
  loading: () => <div className="w-full h-[75vh] bg-gray-50 animate-pulse rounded-2xl" />
});

export const revalidate = 3600;

export default async function MapPage() {
  const albums = await getAlbums();
  const posts = await getPublishedPosts();

  return (
    <main className="max-w-[1400px] mx-auto px-6 py-12 md:py-20">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-950 mb-4 inline-block">
          足跡地圖
        </h1>
        <div className="w-12 h-1 bg-brand-pink-main rounded-full"></div>
      </div>

      <JourneyMap albums={albums} posts={posts} lang="zh" />
    </main>
  );
}