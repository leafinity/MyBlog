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

      {/* 標題與按鈕 */}
      <div className="relative z-25 flex flex-col items-center text-center max-w-xl mx-auto space-y-12">
        
        {/* 主標題與副標題 */}
        <div className="space-y-5">
          <h1 className="text-3xl md:text-5xl font-bold tracking-widest text-white drop-shadow-lg">
            Abby&apos;s Journey
          </h1>
          <p className="text-sm md:text-base text-gray-100 font-light tracking-widest drop-shadow-md">
            透過相機鏡頭，記錄北歐與世界的足跡
          </p>
        </div>

        {/* 按鈕 */}
        <div>
          <Link
            href="/blog"
            className="group flex items-center justify-center px-10 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white hover:text-brand-pink-main text-sm md:text-base font-medium tracking-widest transition-all duration-300 shadow-2xl hover:scale-105"
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