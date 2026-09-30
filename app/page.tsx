import { NotionAPI } from 'notion-client';
import NotionRendererView from './NotionRendererView';

// 初始化 API 實例
const notion = new NotionAPI();

export default async function BlogPage() {
  // 替換成你的 Notion 頁面 ID (網址後面那 32 個字元)
  // 注意：這篇文章在 Notion 右上角必須開啟 "Share to web"
  const pageId = '0d0b038c922b832aa8f781d9d53e4ffc';

  try {
    // 向 Notion 撈取這頁所有的 Block 結構 (回傳完整的 JSON)
    const recordMap = await notion.getPage(pageId);

    // 把撈回來的資料丟給 Client 元件渲染
    return <NotionRendererView recordMap={recordMap} />;
  } catch (error) {
    return <div>文章讀取失敗，請檢查 Page ID 或是否已設為公開。</div>;
  }
}