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

      {/* 標題與副標 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-25 pointer-events-none px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-wider text-white drop-shadow-lg mb-3">
          Abby&apos;s Journey
        </h1>
        <p className="text-sm md:text-base text-gray-300 font-light tracking-widest drop-shadow-md">
          透過相機鏡頭，記錄北歐與世界的足跡
        </p>
      </div>

      {/* 探索足跡按鈕 */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
        <Link
          href="/blog"
          className="group flex items-center justify-center px-10 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 hover:border-brand-pink-main rounded-full text-white/90 hover:text-white text-sm font-medium tracking-widest transition-all duration-300 shadow-2xl hover:scale-105"
        >
          <span>探索足跡</span>
        </Link>
      </div>
    </main>
  );
}