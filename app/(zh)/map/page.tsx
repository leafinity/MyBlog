import { getAlbums, getPublishedPosts } from '../../../lib/notion';
import ClientJourneyMap from '../../../components/ClientJourneyMap';

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

      <ClientJourneyMap albums={albums} posts={posts} lang="zh" />

      {/* 鍵盤操作提示 */}
      <div className="flex items-center justify-center gap-2 text-xs text-gray-400 py-1">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>
          小提示：按下 <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-600 font-mono">Tab</kbd> 聚焦地圖後，即可用 <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-600 font-mono">+/-</kbd> 縮放，或用方向鍵移動！
        </span>
      </div>
    </main>
  );
}