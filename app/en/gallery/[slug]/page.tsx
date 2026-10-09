import { getPhotosByAlbum, getAlbums } from '../../../../lib/notion';
import MasonryGallery from '../../../../components/MasonryGallery';
import Link from 'next/link';

export const revalidate = 3600;

export default async function AlbumPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  // 從 DB2 撈出這趟旅行的所有照片
  const photos = await getPhotosByAlbum(slug);

  // 從 DB1 撈出相簿清單，用來顯示正確的中文標題
  const albums = await getAlbums();
  const currentAlbum = albums.find((a: any) => a.slug === slug);

  if (!photos || photos.length === 0) {
    return <div className="text-center py-20 text-gray-500">此相簿目前沒有照片</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 bg-[#fafafa] min-h-screen">
      
      {/* 頂部：返回按鈕與相簿標題 */}
      <div className="mb-12 text-center relative">
        <Link 
          href="/gallery" 
          className="absolute left-0 top-1/2 -translate-y-1/2 text-sm text-gray-400 hover:text-[#DC9FB4] transition-colors uppercase tracking-wider font-bold hidden md:block"
        >
          ← Gallery
        </Link>
        
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 inline-block">
          {currentAlbum ? currentAlbum.titleZH : slug}
        </h1>
        <div className="w-12 h-1 bg-[#F4A7B9] mx-auto rounded-full"></div>
      </div>

      {/* 呼叫 Client Component 處理瀑布流 */}
      <MasonryGallery photos={photos} />

    </div>
  );
}