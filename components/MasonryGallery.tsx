"use client";

import { useState } from 'react';

export default function MasonryGallery({ photos }: { photos: any[] }) {
  // 1. 控制載入更多的數量 (預設顯示 9 張)
  const [displayCount, setDisplayCount] = useState(9);
  const [activePhoto, setActivePhoto] = useState<any | null>(null);

  return (
    <div>
      {/* 瀑布流排版 (Masonry Layout) */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
        {photos.slice(0, displayCount).map((photo) => (
          <div 
            key={photo.id} 
            className="break-inside-avoid relative group mb-6"
            onClick={() => setActivePhoto(photo)}
          >
            <img 
              src={photo.cloudinaryUrl} 
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

      {/* 點擊後的全螢幕燈箱 */}
      {activePhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-10 cursor-pointer"
          onClick={() => setActivePhoto(null)} // 點擊任意處關閉
        >
          {/* 關閉按鈕 */}
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white text-xl p-2 transition-colors"
            onClick={() => setActivePhoto(null)}
          >
            ✕
          </button>

          {/* 放大照片本體 */}
          <div className="relative max-w-7xl max-h-[90vh] flex flex-col items-center">
            <img
              src={activePhoto.url}
              alt={activePhoto.location || 'Photo'}
              className="max-w-full max-h-[82vh] object-contain select-none"
              onClick={(e) => e.stopPropagation()} // 點擊圖片本身不會意外關閉
            />
            {activePhoto.location && (
              <span className="mt-4 text-white/80 text-sm tracking-wider font-light">
                {activePhoto.location}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
    </div>
  );
}