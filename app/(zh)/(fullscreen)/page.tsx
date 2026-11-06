import Link from 'next/link';
import PhotoScreensaver from '../../../components/PhotoScreensaver';
import { getAllScreensaverPhotos } from '../../../lib/notion'; 

export const revalidate = 86400;

export default async function Home() {
  const photos = await getAllScreensaverPhotos();

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black flex flex-col justify-between items-center py-12 md:py-20 px-6">
      {/* 相片輪播 */}
      <PhotoScreensaver photos={photos} />

      {/* 上方佔位 */}
      <div className="w-full h-1/4 pointer-events-none" />

      <div className="relative z-25 flex flex-col items-center text-center max-w-xl mx-auto space-y-10">
        
        {/* 主標題與副標題 */}
        <div className="space-y-4">
          <h1 className="text-2xl md:text-4xl font-bold tracking-widest text-white drop-shadow-lg">
            Abby&apos;s Journey
          </h1>
          <p className="text-xs md:text-sm text-gray-200 font-light tracking-widest drop-shadow-md">
            透過相機鏡頭，記錄北歐與世界的足跡
          </p>
        </div>

        {/* 按鈕 */}
        <div>
          <Link
            href="/blog"
            className="group flex items-center justify-center px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white/90 hover:text-brand-pink-main text-xs md:text-sm font-medium tracking-widest transition-all duration-300 shadow-2xl hover:scale-105"
          >
            <span>探索足跡</span>
          </Link>
        </div>

      </div>

      {/* 下方佔位 */}
      <div className="w-full h-1/4 pointer-events-none" />
    </main>
  );
}