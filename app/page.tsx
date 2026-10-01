// app/page.tsx
import Link from 'next/link';
import { getPublishedPosts } from '@/lib/notion';

export default async function HomePage() {
  // 畫面元件只負責呼叫，不負責管裡面怎麼抓的
  const posts = await getPublishedPosts(); 

  return (
    <div className="max-w-4xl mx-auto py-16 px-6 font-sans bg-gray-50 min-h-screen">
      <header className="mb-12 border-b border-gray-200 pb-6">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Abby's Journey
        </h1>
      </header>

      <main className="flex flex-col gap-6">
        {posts.map((post: any) => (
          <Link 
            key={post.id} 
            href={`/${post.slug}`} 
            className="group block p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200"
          >
            <h2 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors mb-2">
              {post.title}
            </h2>
            <div className="text-sm text-gray-500 font-medium tracking-wide mb-4">
              {post.date}
            </div>
            {post.summary && (
              <p className="text-gray-600 leading-relaxed line-clamp-3">
                {post.summary}
              </p>
            )}
            <div className="mt-4 text-blue-500 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
              閱讀全文 →
            </div>
          </Link>
        ))}
      </main>
    </div>
  );
}