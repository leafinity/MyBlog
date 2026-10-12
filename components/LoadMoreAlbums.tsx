"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function LoadMoreAlbums({ albums, lang = 'zh' }: { albums: any[], lang?: 'zh' | 'en' }) {
  const itemsPerPage = 9;
  const [displayCount, setDisplayCount] = useState(itemsPerPage);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* 手機 1 欄、平板 2 欄、電腦 3 欄 */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8">
          {albums.slice(0, displayCount).map((album) => (
            <Link 
              href={`/gallery/${album.slug}`} 
              key={album.slug} 
              className="break-inside-avoid mb-8 group block bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-50 overflow-hidden"
            >
              <div className="w-full overflow-hidden relative bg-gray-100">
                <img
                  src={album.coverUrl}
                  alt={lang === 'zh' ? album.titleZH : album.titleEN}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* 標題浮在照片上 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <h3 className="text-white font-medium text-lg drop-shadow-md line-clamp-1">
                    {lang === 'zh' ? album.titleZH : album.titleEN}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {displayCount < albums.length && (
      <div className="mt-20 text-center">
        <button
          onClick={() => setDisplayCount(prev => prev + itemsPerPage)}
          className="px-8 py-3 text-sm font-bold tracking-wider text-gray-600 uppercase transition-all bg-white border-2 border-gray-200 rounded-full hover:border-gray-900 hover:text-gray-900"
        >
          {lang === 'zh' ? '載入更多相簿' : 'Load More Albums'}
        </button>
      </div>
    )}
    </div>
  );
}