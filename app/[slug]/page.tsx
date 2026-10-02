import { NotionAPI } from 'notion-client';
import { getPostBySlug } from '../lib/notion';
import NotionRendererView from '../../components/NotionRendererView';
import { reverseTagMap } from '../../lib/mapping';

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

  const recordMap = await notionX.getPage(post.id);

  return (
    <article className="max-w-4xl mx-auto px-6 py-12 md:py-20">
      
      {/* 文章標題與日期 */}
      <header className="mb-12 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>
        <p className="text-brand-pink-main font-medium tracking-wide">
          {post.date}
        </p>
      </header>

      {/* Notion 文章內容 */}
      <div className="prose prose-lg max-w-none prose-pink">
        <NotionRendererView recordMap={post.recordMap} />
      </div>

      {/* 動態渲染的標籤區塊 */}
      {post.tags && post.tags.length > 0 && (
        <div className="mt-16 pt-8 border-t border-gray-100">
          <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase mb-4">
            相關主題
          </h3>
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