"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Album } from '../lib/notion';

export default function LoadMoreAlbums({ albums, lang = 'zh' }: { albums: albums: any[], lang?: 'zh' | 'en' }) {
  const itemsPerPage = 9;
  const [displayCount, setDisplayCount] = useState(itemsPerPage);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {albums.slice(0, displayCount).map((album) => (
          <Link href={`/gallery/${album.slug}`} key={album.slug} className="group block">
            
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden mb-5 bg-gray-100 shadow-sm border border-gray-100">
              <img 
                src={album.coverUrl || '/default-cover.jpg'} 
                alt={lang === 'zh' ? album.titleZH : album.titleEN} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            <div className="flex flex-col">
              <h2 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-[#F4A7B9] transition-colors line-clamp-1">
                {lang === 'zh' ? album.titleZH : album.titleEN}
              </h2>
              {(album.titleEN || album.titleZH) && (
                <p className="text-xs font-medium text-gray-400 tracking-wider uppercase line-clamp-1">
                  {lang === 'zh' ? album.titleEN : album.titleZH}
                </p>
              )}
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