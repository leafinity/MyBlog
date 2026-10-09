"use client";

import Link from 'next/link';

export default function GallerySidebar({ 
  albums, 
  currentSlug, 
  lang = 'zh' 
}: { 
  albums: any[], 
  currentSlug: string, 
  lang?: 'zh' | 'en' 
}) {
  return (
    <aside className="hidden md:block w-64 flex-shrink-0 pr-10 border-r border-gray-100 mr-10">
      <div className="sticky top-24">

        <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-widest mb-6">
          {lang === 'zh' ? '所有相簿' : 'All Albums'}
        </h3>
        
        <ul className="space-y-4">
        {/* 左箭頭圖示 */}
        <li>
          <Link 
            href="/gallery"
            className="text-gray-400 hover:text-brand-pink-main transition-colors block"
            aria-label={lang === 'zh' ? '返回相簿牆' : 'Back to Albums'}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            </Link>
          </li>
          
          <div className="w-8 h-px bg-gray-200 my-4"></div>

          {albums.map((album) => (
            <li key={album.slug}>
              <Link 
                href={`/gallery/${album.slug}`}
                className={`text-sm transition-colors block line-clamp-1 ${
                  currentSlug === album.slug 
                    ? 'font-bold text-brand-pink-main'
                    : 'text-gray-500 hover:text-brand-pink-light'
                }`}
              >
                {lang === 'zh' ? album.titleZH : album.titleEN}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}