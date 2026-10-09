import { getAlbums } from '@/lib/notion';
import LoadMoreAlbums from '@/components/LoadMoreAlbums';

export const revalidate = 3600;

export default async function GalleryIndexPage() {
  const albums = await getAlbums();

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 bg-[#fafafa] min-h-screen">
      
      <header className="mb-16 md:mb-24 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          Photography
        </h1>
        <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
          透過相機鏡頭，紀錄每一次的北歐與世界足跡。
        </p>
      </header>

      {albums.length === 0 ? (
        <div className="text-center text-gray-500 py-20">目前尚無相簿資料</div>
      ) : (
        // 直接把資料丟給 LoadMoreAlbums 渲染
        <LoadMoreAlbums albums={albums} lang="zh" />
      )}

    </div>
  );
}