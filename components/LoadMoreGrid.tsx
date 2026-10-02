"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function LoadMoreGrid({ posts }: { posts: any[] }) {
  const [displayCount, setDisplayCount] = useState(6);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12">
        {posts.slice(0, displayCount).map((post) => (
          <Link href={`/${post.slug}`} key={post.id} className="group flex flex-col h-full bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-5 border border-gray-50 overflow-hidden">
            
            <div className="w-full aspect-[4/3] overflow-hidden mb-6 relative bg-gray-100">
              <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-pink-main transition-colors line-clamp-2 leading-snug">
              {post.title}
            </h3>
            
            <p className="text-sm text-brand-pink-light mb-4 font-medium tracking-wide">
              {post.date}
            </p>
            
            <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">
              {post.summary}
            </p>
            
            <p className="text-brand-pink-main text-sm mb-4 transition-colors group-hover:text-gray-900">
              閱讀全文 »
            </p>
            
            <div className="text-sm text-brand-pink-light mt-auto">
              {[post.category, ...(post.tags || [])]
                .filter(Boolean)
                .join(', ')}
            </div>
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