"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function LoadMoreGrid({ posts }: { posts: any[] }) {
  // 預設顯示 6 篇文章（剛好排滿兩排三欄）
  const [displayCount, setDisplayCount] = useState(9);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12">
        {posts.slice(0, displayCount).map((post) => (
          <Link href={`/${post.slug}`} key={post.id} className="group flex flex-col h-full">
            <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-5 relative bg-gray-100">
              <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#E16B8C] transition-colors line-clamp-2 leading-snug">{post.title}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow leading-relaxed">{post.excerpt}</p>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{post.date}</p>
          </Link>
        ))}
      </div>

      {/* 當還有未顯示的文章時，才出現載入更多按鈕 */}
      {displayCount < posts.length && (
        <div className="mt-16 text-center">
          <button
            onClick={() => setDisplayCount(prev => prev + 6)}
            className="px-8 py-3 text-sm font-bold tracking-wider text-gray-600 uppercase transition-all bg-white border-2 border-gray-200 rounded-full hover:border-gray-900 hover:text-gray-900"
          >
            載入更多文章
          </button>
        </div>
      )}
    </div>
  );
}