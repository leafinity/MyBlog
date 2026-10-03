import Link from 'next/link';
import { NotionAPI } from 'notion-client';
import { getPostBySlug } from '../../../lib/notion';
import NotionRendererView from '../../../components/NotionRendererView';
import { reverseTagMap } from '../../../lib/mapping';

export const revalidate = 3600;
const notionX = new NotionAPI();

// posts or pages
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    return <div className="text-center py-20">找不到文章</div>;
  }
  
  const notionX = new NotionAPI();
  const recordMap = await notionX.getPage(post.id);

  return (
    <article className="max-w-4xl mx-auto px-6 py-12 md:py-20">
      
      {/* 文章標題與日期 remove text-center*/}
      <header className="mb-12">
        <h1 className="text-xl md:text-3xl font-extrabold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>
        {post.type === 'Post' && (<
          div className="flex items-center text-brand-pink-main font-medium tracking-wide">
            {/* 時鐘 SVG Icon */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>
              {post.date}
            </p>
          </div>
        )}
      </header>

      {/* Notion 文章內容 */}
      <div className="prose prose-lg max-w-none prose-pink">
        <NotionRendererView recordMap={recordMap} />
      </div>

      {/* 動態渲染的標籤區塊 */}
      {post.tags && post.tags.length > 0 && (
        <div className="mt-16 pt-8">
          <div className="flex flex-wrap gap-3">
            {post.tags.map((tag: string) => {
              const tagSlug = reverseTagMap[tag] || tag;

              return (
                <Link 
                  key={tag} 
                  href={`/tag/${tagSlug}`} 
                  className="text-sm font-bold tracking-wider text-brand-pink-main bg-brand-pink-main/10 px-4 py-2 rounded-full uppercase transition-colors hover:bg-brand-pink-main hover:text-white"
                >
                  #{tag}
                </Link>
              );
            })}
          </div>
        </div>
      )}

    </article>
  );
}