import Link from 'next/link';
import PhotoScreensaver from '../../../components/PhotoScreensaver';
import { getAllScreensaverPhotos } from '../../../lib/notion'; 

export const revalidate = 86400;

export default async function Home() {
  const photos = await getAllScreensaverPhotos();

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black">
      {/* 相片輪播 */}
      <PhotoScreensaver photos={photos} />

      <div className="absolute inset-0 flex flex-col items-center justify-center pt-40 text-center z-25 pointer-events-none px-4 space-y-8">
        {/* 標題與副標 */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-4xl font-bold tracking-widest text-white drop-shadow-lg">
            Abby&apos;s Journey
          </h1>
          <p className="text-xs md:text-sm text-gray-300 font-light tracking-widest drop-shadow-md">
            透過相機鏡頭，記錄北歐與世界的足跡
          </p>
        </div>

        {/* 探索足跡按鈕（因為外層有 pointer-events-none，這裡要加上 pointer-events-auto 確保可以點擊） */}
        <div className="pointer-events-auto">
          <Link
            href="/blog"
            className="group flex items-center justify-center px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white/90 hover:text-brand-pink-main text-sm font-medium tracking-widest transition-all duration-300 shadow-2xl hover:scale-105"
          >
            <span>探索足跡</span>
          </Link>
        </div>
      </div>
    
    </main>
  );
}