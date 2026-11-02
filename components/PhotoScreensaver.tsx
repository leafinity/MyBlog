"use client";

import { useState, useEffect } from 'react';

interface Photo {
  url: string;
  cloudinaryUrl: string;
  slug: string; // 格式如 "2026-abisko"
  alt?: string;
}

export default function PhotoScreensaver({ photos }: { photos: Photo[] }) {
  const [shuffledPhotos, setShuffledPhotos] = useState<Photo[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (photos && photos.length > 0) {
      const shuffled = [...photos].sort(() => Math.random() - 0.5);
      setShuffledPhotos(shuffled);
    }
  }, [photos]);

  // 把 "2026-abisko" 拆成年份與格式化地點
  const parseSlug = (slug: string) => {
    if (!slug) return { year: '', title: 'Abby’s Journey' };
    const parts = slug.split('-');
    const year = parts[0] || '';
    // 把剩下的部分用空格連起來，並把每個單字字首大寫
    const rawTitle = parts.slice(1).join(' ');
    const title = rawTitle
      ? rawTitle.charAt(0).toUpperCase() + rawTitle.slice(1)
      : 'Travel Moment';

    return { year, title };
  };

  useEffect(() => {
    if (!photos || photos.length <= 1) return;

    // 每 6 秒自動隨機換一張照片
    const interval = setInterval(() => {
      setFade(false); // 開始淡出

      setTimeout(() => {
        let nextIndex;
        do {
          nextIndex = Math.floor(Math.random() * photos.length);
        } while (nextIndex === currentIndex && photos.length > 1);

        setCurrentIndex(nextIndex);
        setFade(true); // 淡入新照片
      }, 1000); // 1 秒過渡時間
    }, 6000);

    return () => clearInterval(interval);
  }, [currentIndex, photos]);

  if (!photos || photos.length === 0) return null;

  const currentPhoto = photos[currentIndex];
  const { year, title } = parseSlug(currentPhoto.slug);

  return (
    <div className="relative w-full h-[75vh] min-h-[500px] overflow-hidden bg-gray-900 rounded-3xl shadow-2xl">
      
      {/* 背景照片：淡入淡出與緩慢縮放 */}
      <img
        src={currentPhoto.cloudinaryUrl}
        alt={currentPhoto.alt || title}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
          fade ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
        } transition-transform duration-[7000ms]`}
      />

      {/* 底部質感漸層遮罩 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

      {/* Google TV 風格角落資訊欄 (自動從 slug 讀取) */}
      <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end text-white">
        
        {/* 左側：自動解析的標題與年份 */}
        <div className="space-y-1">
          {year && (
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-medium tracking-wide mb-2">
              {year}
            </span>
          )}
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight