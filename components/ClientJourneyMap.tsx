"use client";

import dynamic from 'next/dynamic';

// 在 Client Component 裡面使用 ssr: false 是完全合法的
const JourneyMap = dynamic(() => import('./JourneyMap'), {
  ssr: false,
  loading: () => <div className="w-full h-[75vh] bg-gray-50 animate-pulse rounded-2xl" />
});

export default function ClientJourneyMap({ albums, posts, lang }: { albums: any[], posts: any[], lang?: 'zh' | 'en' }) {
  return <JourneyMap albums={albums} posts={posts} lang={lang} />;
}