import { getPostsByTag } from '../../../lib/notion';
import LoadMoreGrid from '../../../components/LoadMoreGrid';
import { tagMap } from '../../../lib/mapping';

export const revalidate = 3600;

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug; 
  
  // 核心魔法：去字典查出對應的中文，查不到就退回原字串
  const currentTag = tagMap[slug] || decodeURIComponent(slug);
  
  const filteredPosts = await getPostsByTag(currentTag);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center mb-10 mt-4">
        <h1 className="text-2xl font-bold text-gray-900 tracking-wider uppercase mr-6">
          {currentTag}
        </h1>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>
      
      {filteredPosts.length > 0 ? (
        <LoadMoreGrid posts={filteredPosts} />
      ) : (
        <div className="text-center py-20 text-gray-500">此標籤尚無文章</div>
      )}
    </div>
  );
}