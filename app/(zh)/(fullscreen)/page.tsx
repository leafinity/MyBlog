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

      {/* 進入按鈕 */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <Link
          href="/blog"
          className="group flex items-center gap-3 px-8 py-3.5 bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 rounded-full text-white text-sm font-medium tracking-widest transition-all duration-300 shadow-2xl hover:scale-105"
        >
          <span>探索足跡</span>
          <svg 
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </main>
  );
}