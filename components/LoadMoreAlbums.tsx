"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function LoadMoreAlbums({ albums, lang = 'zh' }: { albums: any[], lang?: 'zh' | 'en' }) {
  const itemsPerPage = 9;
  const [displayCount, setDisplayCount] = useState(itemsPerPage);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12">
        {albums.slice(0, displayCount).map((album) => (
          <Link href={`/gallery/${album.slug}`} key={album.slug} className="
            group flex flex-col h-full bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-50 overflow-hidden">
            {/*aspect-[4/3]*/}
            <div className="w-full overflow-hidden relative bg-gray-100">
              <img src={album.coverUrl} 
                alt={lang === 'zh' ? album.titleZH : album.titleEN} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-pink-main transition-colors line-clamp-2 leading-snug">
                {lang === 'zh' ? album.titleZH : album.titleEN}
              </h3>
            </div>
          </Link>
        ))}
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