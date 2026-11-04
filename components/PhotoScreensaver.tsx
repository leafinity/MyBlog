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
      setIsFading(true);

      setTimeout(() => {
        setCurrentIndex(next);
        setNextIndex(null);
        setIsFading(false);
      }, 1000);
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
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-black z-0">
      <img
        src={currentPhoto.cloudinaryUrl}
        alt={currentPhoto.alt || title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* 下一張圖片（交叉淡入） */}
      {nextPhoto && (
        <img
          src={nextPhoto.url}
          alt={nextPhoto.alt || ''}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            isFading ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* 底部漸層遮罩 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

      {/* 左下角資訊欄 */}
      <div className="absolute bottom-10 left-8 md:left-14 flex flex-col items-start text-white z-10 space-y-1">
        {year && (
          <span className="text-xs font-light tracking-widest text-gray-300 drop-shadow-md">
            {year}
          </span>
        )}
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-white/90 drop-shadow-md">
          {title}
        </h2>
      </div>
    </div>
  );
}