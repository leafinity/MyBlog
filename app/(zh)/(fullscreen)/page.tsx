import Link from 'next/link';
import PhotoScreensaver from '../../../components/PhotoScreensaver';
import { getAllScreensaverPhotos } from '../../../lib/notion'; 

export const revalidate = 86400;

export default async function Home() {
  const photos = await getAllScreensaverPhotos();

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black flex flex-col justify-between items-center py-10 md:py-16 px-6">
      {/* 1. 滿版背景相片輪播 */}
      <PhotoScreensaver photos={photos} />

      {/* 2. 上方佔位 */}
      <div className="w-full h-1/4 pointer-events-none" />

      {/* 3. 中間偏下的群組：主副標題與按鈕之間精準留出約一個標題高度的空間 */}
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

        {/* 探索足跡按鈕（與上方拉開剛好的舒適間距） */}
        <div>
          <Link
            href="/blog"
            className="group flex items-center justify-center px-9 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white/90 hover:text-brand-pink-main text-xs md:text-sm font-medium tracking-widest transition-all duration-300 shadow-2xl hover:scale-105"
          >
            <span>探索足跡</span>
          </Link>
        </div>

      </div>

      {/* 4. 下方佔位 */}
      <div className="w-full h-1/4 pointer-events-none" />
    </main>
  );
}