"use client";

import { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // 監聽網頁捲動高度
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // 點擊後平滑捲動到頂部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      // 使用 Tailwind 設定位置、顏色與優雅的淡入淡出動畫
      className={`
        fixed bottom-8 right-8 z-50 p-3 rounded-full 
        bg-white border-2 border-brand-pink-light text-brand-pink-main 
        shadow-lg hover:shadow-xl hover:bg-brand-pink-main hover:text-white hover:border-brand-pink-main 
        transition-all duration-300 ease-in-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
      `}
      aria-label="回到最上面"
    >
      {/* 這是一個簡潔的向上箭頭 SVG */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}