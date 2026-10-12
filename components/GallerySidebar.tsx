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
    <aside className="hidden md:block w-64 flex-shrink-0 mr-12">
      <div className="sticky top-24">

        <ul className="space-y-6">

        <li>
          {/* 左箭頭圖示 */}
          <Link 
            href="/gallery"
            className="text-brand-pink-light hover:text-gray-400 transition-colors block"
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
          {albums.map((album) => {
            const isSelected = currentSlug === album.slug;
            return (
              <li key={album.slug}>
                <Link
                  href={`/gallery/${album.slug}`}
                  className={`text-base transition-colors duration-200 block line-clamp-1 ${
                    isSelected
                      ? 'text-brand-pink-main font-medium' 
                      : 'text-brand-pink-light hover:text-gray-400'
                  }`}
                >
                  {lang === 'zh' ? album.titleZH : album.titleEN}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
