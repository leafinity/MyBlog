"use client";

import { useState, useEffect } from 'react';

interface Photo {
  url: string;
  cloudinaryUrl: string;
  slug: string;
  alt: string;
}

export default function PhotoScreensaver({ photos }: { photos: Photo[] }) {
  const [shuffledPhotos, setShuffledPhotos] = useState<Photo[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [isFading, setIsFading] = useState(false);

  // 隨機洗牌
  useEffect(() => {
    if (photos && photos.length > 0) {
      const shuffled = [...photos].sort(() => Math.random() - 0.5);
      setShuffledPhotos(shuffled);
    }
  }, [photos]);

  // 每 6 秒自動平滑切換
  useEffect(() => {
    if (!shuffledPhotos || shuffledPhotos.length <= 1) return;

    const interval = setInterval(() => {
      const next = (currentIndex + 1) % shuffledPhotos.length;
      setNextIndex(next);
      setIsFading(true); // 開始淡入下一張圖

      // 動畫結束後更新當前索引，重置下一張狀態
      setTimeout(() => {
        setCurrentIndex(next);
        setNextIndex(null);
        setIsFading(false);
      }, 1000); // 1秒的漸層過渡時間
    }, 6000);

    return () => clearInterval(interval);
  }, [currentIndex, shuffledPhotos]);

  const parseSlug = (slug: string) => {
    if (!slug) return { year: '', title: 'Abby’s Journey' };
    const parts = slug.split('-');
    const year = parts[0] || '';
    const rawTitle = parts.slice(1).join(' ');
    const title = rawTitle
      ? rawTitle.charAt(0).toUpperCase() + rawTitle.slice(1)
      : 'Travel Moment';
    return { year, title };
  };

  if (!shuffledPhotos || shuffledPhotos.length === 0) return null;

  const currentPhoto = shuffledPhotos[currentIndex];
  const nextPhoto = nextIndex !== null ? shuffledPhotos[nextIndex] : null;
  const { year, title } = parseSlug(currentPhoto.slug);

  return (
    <div className="relative w-full h-[85vh] min-h-[600px] overflow-hidden bg-black">
      
      <img
        src={currentPhoto.cloudinaryUrl}
        alt={currentPhoto.alt}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {nextPhoto && (
        <img
          src={nextPhoto.url}
          alt={nextPhoto.alt || ''}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            isFading ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

      <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end text-white z-10">
        <div className="space-y-1">
          {year && (
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-medium tracking-wide mb-2">
              {year}
            </span>
          )}
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white drop-shadow-md">
            {title}
          </h2>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-gray-400 font-mono tracking-wider">
          <span>{currentIndex + 1} / {shuffledPhotos.length}</span>
          <div className="w-2 h-2 rounded-full bg-brand-pink-main animate-pulse" />
        </div>
      </div>

    </div>
  );
}