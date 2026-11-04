import Link from 'next/link';
import PhotoScreensaver from '../../../components/PhotoScreensaver';
import { getAllScreensaverPhotos } from '../../../lib/notion'; 

export const revalidate = 86400;

export default async function Home() {
  const photos = await getAllScreensaverPhotos();

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black flex flex-col justify-between items-center py-12 md:py-16 px-6">
      {/* 相片輪播 */}
      <PhotoScreensaver photos={photos} />

      {/* 上方的空間佔位 */}
      <div className="w-full h-1/3 pointer-events-none" />

      {/* 標題與按鈕 */}
      <div className="relative z-25 flex flex-col items-center text-center space-y-6 max-w-xl mx-auto">
        <div className="space-y-2">
          <h1 className="text-xl md:text-3xl font-bold tracking-widest text-white drop-shadow-lg">
            Abby&apos;s Journey
          </h1>
          <p className="text-[11px] md:text-xs text-gray-300 font-light tracking-widest drop-shadow-md">
            透過相機鏡頭，記錄北歐與世界的足跡
          </p>
        </div>

        <div className="pt-1">
          <Link
            href="/blog"
            className="group flex items-center justify-center px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white/90 hover:text-brand-pink-main text-xs md:text-sm font-medium tracking-widest transition-all duration-300 shadow-2xl hover:scale-105"
          >
            <span>探索足跡</span>
          </Link>
        </div>
      </div>

      {/* 底部的空間佔位 */}
      <div className="w-full h-1/4 pointer-events-none" />
    </main>
  );
}