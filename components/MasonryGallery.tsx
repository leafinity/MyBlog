"use client";

import { useState } from 'react';

export default function MasonryGallery({ photos }: { photos: any[] }) {
  // 1. 控制載入更多的數量 (預設顯示 9 張)
  const [displayCount, setDisplayCount] = useState(9);

  return (
    <div>
      {/* 瀑布流排版 (Masonry Layout) */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
        {photos.slice(0, displayCount).map((photo) => (
          <div 
            key={photo.id} 
            className="break-inside-avoid relative group mb-6"
          >
            <img 
              src={photo.url} 
              alt={photo.alt} 
              className="w-full object-cover hover:opacity-90 transition-opacity duration-300 bg-gray-100" 
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* 載入更多按鈕 */}
      {displayCount < photos.length && (
        <div className="mt-20 text-center">
          <button
            onClick={() => setDisplayCount(prev => prev + 9)} // 每次多載入 9 張
            className="px-8 py-3 text-sm font-bold tracking-wider text-gray-600 uppercase transition-all bg-white border-2 border-gray-200 rounded-full hover:hover:border-brand-pink-main hover:text-gray-900"
          >
            載入更多照片
          </button>
        </div>
      )}
    </div>
  );
}