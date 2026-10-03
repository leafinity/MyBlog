import Link from 'next/link';
import { getPublishedPosts } from '../../lib/notion';
import LoadMoreGrid from '../../components/LoadMoreGrid';

export default async function Home() {
  const posts = await getPublishedPosts('en')

  if (!posts || posts.length === 0) return <div className="text-center py-20">尚無文章</div>;

  // 把文章切分成「最新一篇」與「其餘所有文章」
  const latestPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      
      {/* Header 區塊 */}
      <div className="flex items-center mb-10 mt-4">
        <h2 className="text-sm font-bold text-gray-900 tracking-wider uppercase mr-6">The Latest Post</h2>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>

      {/* 最新文章 (大卡片) */}
      {latestPost && (
        <Link href={`/${latestPost.slug}`} className="block group mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 p-4 md:p-6">
            
            <div className="h-64 md:h-[400px] w-full relative overflow-hidden rounded-xl">
              <img src={latestPost.imageUrl} alt={latestPost.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
            </div>
            
            <div className="p-4 md:p-8 md:pr-12 flex flex-col h-full justify-center">
              
              {/* 標題 hover 使用主色 (深粉) */}
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 group-hover:text-brand-pink-main transition-colors leading-tight">
                {latestPost.title}
              </h2>
              
              {/* 日期使用副色 (淺粉) */}
              <p className="text-sm text-brand-pink-light mb-5 font-medium tracking-wide">
                {latestPost.date}
              </p>
              
              <p className="text-gray-600 mb-8 text-lg line-clamp-3 leading-relaxed">
                {latestPost.summary}
              </p>
              
              {/* 閱讀全文 hover 使用主色 (深粉) */}
              <p className=" text-md mb-6 transition-colors text-gray-600 group-hover:text-brand-pink-main">
                閱讀全文 »
              </p>
              
              {/* 標籤小字使用副色 (淺粉) */}
              <div className="text-sm text-brand-pink-light mt-auto">
                {[latestPost.category, ...(latestPost.tags || [])]
                  .filter(Boolean) 
                  .join(', ')}
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* 極簡分隔線與區塊標題 */}
      <div className="flex items-center mb-10 mt-4">
        <h2 className="text-sm font-bold text-gray-900 tracking-wider uppercase mr-6">All Posts</h2>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>

      {/* 其餘文章 (三欄網格) */}
      <LoadMoreGrid posts={otherPosts} />

    </div>
  );
}