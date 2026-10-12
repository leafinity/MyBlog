import { getPhotosByAlbum, getAlbums } from '../../../../lib/notion';
import MasonryGallery from '../../../../components/MasonryGallery';
import GallerySidebar from '../../../../components/GallerySidebar';
import Link from 'next/link';

export const revalidate = 3600;

export default async function AlbumPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const lang = 'zh'; 
  
  const photos = await getPhotosByAlbum(slug);
  const albums = await getAlbums();
  const currentAlbum = albums.find((a: any) => a.slug === slug);

  return (
    // 最外層加入 flex，讓 Sidebar 跟瀑布流左右並排
    <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-20 bg-[#fafafa] min-h-screen flex flex-col md:flex-row">
      
      {/* 左側：插入 Sidebar，並傳入目前的 slug */}
      <GallerySidebar albums={albums} currentSlug={slug} lang={lang} />

      {/* 右側：主要的瀑布流區塊 */}
      <main className="flex-grow">
        
        {/* 標題區塊 */}
        <div className="mb-12 relative">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 inline-block">
            {currentAlbum.titleZH}
          </h1>
          <div className="w-12 h-1 bg-brand-pink-main rounded-full"></div>
        </div>

        {/* 瀑布流元件 */}
        {(!photos || photos.length === 0) ? (
          <div className="py-20 text-gray-400 text-sm tracking-wide">
            此相簿目前沒有照片
          </div>
        ) : (
          <MasonryGallery photos={photos} />
        )}
      </main>
    </div>
  );
}
