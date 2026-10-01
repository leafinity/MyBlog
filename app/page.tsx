import Link from 'next/link';
import { getPublishedPosts } from '../lib/notion';

export default async function Home() {
  const posts = await getPublishedPosts();

  if (!posts || posts.length === 0) return <div className="text-center py-20">尚無文章</div>;

  // 把文章切分成「最新一篇」與「其餘所有文章」
  const latestPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      
      {/* Header 區塊 */}
      <div className="flex justify-between items-end mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Blog</h1>
        <p className="text-gray-500 text-sm hidden sm:block">Explore my latest journeys</p>
      </div>

      {/* 最新文章 (大卡片) */}
      {latestPost && (
        <Link href={`/${latestPost.slug}`} className="block group mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 p-4 md:p-6">
            <div className="h-64 md:h-[400px] w-full relative overflow-hidden rounded-xl">
              <img src={latestPost.imageUrl} alt={latestPost.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-4 md:p-8 md:pr-12">
              <p className="text-sm text-[#E16B8C] font-bold tracking-wider mb-3 uppercase">Latest</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 group-hover:text-[#E16B8C] transition-colors leading-tight">{latestPost.title}</h2>
              <p className="text-gray-600 mb-6 text-lg line-clamp-3 leading-relaxed">{latestPost.excerpt}</p>
              <p className="text-sm text-gray-400 font-medium">{latestPost.date}</p>
            </div>
          </div>
        </Link>
      )}

      {/* 極簡分隔線與區塊標題 */}
      <div className="flex items-center mb-10 mt-4">
        <h2 className="text-sm font-bold text-gray-900 tracking-wider uppercase mr-6">所有文章</h2>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>

      {/* 其餘文章 (三欄網格) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12">
        {otherPosts.map(post => (
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

    </div>
  );
}