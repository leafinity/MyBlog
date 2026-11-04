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
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-24 text-center z-25 pointer-events-none px-4">
        <h1 className="text-2xl md:text-4xl font-bold tracking-widest text-white drop-shadow-lg mb-2">
          Abby&apos;s Journey
        </h1>
        <p className="text-xs md:text-sm text-gray-300 font-light tracking-widest drop-shadow-md">
          透過相機鏡頭，記錄北歐與世界的足跡
        </p>
      </div>

      {/* 探索足跡按鈕 */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
        <Link
          href="/blog"
          className="group flex items-center justify-center px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white/90 hover:text-brand-pink-main text-sm font-medium tracking-widest transition-all duration-300 shadow-2xl hover:scale-105"
        >
          <span>探索足跡</span>
        </Link>
      </div>
    </main>
  );
}