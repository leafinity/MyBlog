"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function FooterLatestPosts({ posts }: { posts: any[] }) {
  const pathname = usePathname();

  // 魔法在這裡：過濾掉 slug 跟當前網址一樣的文章，並確保最後只顯示 4 篇
  const filteredPosts = posts
    .filter((post) => `/${post.slug}` !== pathname)
    .slice(0, 4);

  return (
    <ul className="space-y-4">
      {filteredPosts.map((post) => (
        <li key={post.id}>
          <Link href={`/${post.slug}`} className="group block">
            <p className="text-brand-pink-main group-hover:text-brand-pink-light text-sm transition-colors line-clamp-2 leading-snug">
              {post.title}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}