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

      {/* 網站標題 */}
      <div className="absolute top-8 left-8 md:left-16 z-20">
        <Link 
          href="/" 
          className="text-white text-lg md:text-xl font-bold tracking-wider drop-shadow-md hover:opacity-80 transition-opacity"
        >
          Abby&apos;s Journey
        </Link>
      </div>

      {/* 進入按鈕 */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
        <Link
          href="/blog"
          className="group flex items-center gap-3 px-8 py-3.5 bg-black/40 hover:bg-black/60 backdrop-blur-md border border-brand-pink-main/50 hover:border-brand-pink-main rounded-full text-white text-sm font-medium tracking-widest transition-all duration-300 shadow-2xl hover:scale-105"
        >
          <span>探索足跡</span>
          <svg 
            className="w-4 h-4 text-brand-pink-main transition-transform duration-300 group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </main>
  );
}