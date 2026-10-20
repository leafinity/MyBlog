"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileTravelOpen, setIsMobileTravelOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* 左側：大頭貼 + Abby's Journey */}
        <Link href="/" className="flex items-center gap-3 group">
          <img 
            src="/avatar.jpg" 
            alt="Abby's Avatar" 
            className="w-8 h-8 rounded-full object-cover group-hover:scale-105 transition-transform"
          />
          <span className="font-extrabold text-xl tracking-tight text-gray-900 transition-colors">
            <span className="hover:text-brand-pink-main transition-colors">Abby's Journey</span>
          </span>
        </Link>

        {/* 手機以外右側：導覽列選單 */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
          
          {/* 下拉式選單：旅遊 */}
          <div className="relative group py-6">
            <button className="flex items-center transition-colors cursor-pointer hover:text-brand-pink-main">
              旅遊
              <svg className="w-4 h-4 ml-1 text-gray-400 group-hover:text-brand-pink-main transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* 子選單 */}
            <div className="absolute right-0 top-full mt-[-8px] w-36 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
              <div className="py-2 bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col text-center">
                <Link href="/category/sw" className="px-4 py-2 hover:bg-gray-50 hover:text-brand-pink-main transition-colors">瑞典旅遊</Link>
                <Link href="/category/no" className="px-4 py-2 hover:bg-gray-50 hover:text-brand-pink-main transition-colors">挪威旅遊</Link>
                <Link href="/category/eu" className="px-4 py-2 hover:bg-gray-50 hover:text-brand-pink-main transition-colors">歐洲其他</Link>
              </div>
            </div>
          </div>


          <Link href="/category/life" className="hover:text-brand-pink-main transition-colors">生活</Link>
          <Link href="/gallery" className="hover:text-brand-pink-main transition-colors">相簿</Link>
          <Link href="/map" className="hover:text-brand-pink-main transition-colors">地圖</Link>
          <Link href="https://www.instagram.com/abbysresa/" className="hover:text-brand-pink-main transition-colors">Instagram</Link>
        </div>

        {/* 手機版右側：漢堡按鈕 */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden p-2 transition-colors focus:outline-none ${
            isOpen ? 'text-brand-pink-main' : 'text-gray-600 hover:text-brand-pink-main'
          }`}
          aria-label="Toggle Menu"
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* 手機版全版下拉選單 */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-6 py-4 space-y-3 text-base font-medium text-gray-600 shadow-lg">
          <div>
            <button
              onClick={() => setIsMobileTravelOpen(!isMobileTravelOpen)}
              className="w-full flex items-center justify-between py-2 hover:text-brand-pink-main transition-colors"
            >
              <span>旅遊</span>
              <svg className={`w-4 h-4 text-gray-400 transition-transform ${isMobileTravelOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isMobileTravelOpen && (
              <div className="pl-4 py-2 space-y-2 flex flex-col bg-gray-50 rounded-lg mt-1 text-sm">
                <Link href="/category/sw" onClick={() => setIsOpen(false)} className="py-1.5 hover:text-brand-pink-main">瑞典旅遊</Link>
                <Link href="/category/no" onClick={() => setIsOpen(false)} className="py-1.5 hover:text-brand-pink-main">挪威旅遊</Link>
                <Link href="/category/eu" onClick={() => setIsOpen(false)} className="py-1.5 hover:text-brand-pink-main">歐洲其他</Link>
              </div>
            )}
          </div>

          <Link href="/category/life" onClick={() => setIsOpen(false)} className="block py-2 hover:text-brand-pink-main transition-colors">生活</Link>
          <Link href="/gallery" onClick={() => setIsOpen(false)} className="block py-2 hover:text-brand-pink-main transition-colors">相簿</Link>
          <Link href="https://www.instagram.com/abbysresa/" onClick={() => setIsOpen(false)} className="block py-2 hover:text-brand-pink-main transition-colors">Instagram</Link>
        </div>
      )}
    </nav>
  );
}