"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function LoadMoreGrid({ posts }: { posts: any[] }) {
  const [displayCount, setDisplayCount] = useState(6);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 gap-y-16">
        {posts.slice(0, displayCount).map((post) => (
          <Link href={`/${post.slug}`} key={post.id} className="group flex flex-col h-full">
            {/* 1. 圖片 */}
            <div className="w-full aspect-[4/3] overflow-hidden mb-6 relative bg-gray-100">
              <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
            </div>
            
            {/* 2. 標題 */}
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#DC9FB4] transition-colors line-clamp-2 leading-snug">
              {post.title}
            </h3>
            
            {/* 3. 日期 (粉色) */}
            <p className="text-sm text-[#DC9FB4] mb-4 font-medium tracking-wide">
              {post.date}
            </p>
            
            {/* 4. Summary (內文摘要) */}
            <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">
              {post.summary}
            </p>
            
            {/* 5. 閱讀全文 */}
            <p className="text-[#DC9FB4] text-sm mb-4 transition-colors group-hover:text-gray-900">
              閱讀全文 »
            </p>
            
            {/* 6. Tags (在最底部，純文字逗號分隔) */}
            {post.tags && post.tags.length > 0 && (
              <div className="text-sm text-[#DC9FB4] mt-auto">
                {post.tags.join(', ')}
              </div>
            )}
          </Link>
        ))}
      </div>

      {displayCount < posts.length && (
        <div className="mt-20 text-center">
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