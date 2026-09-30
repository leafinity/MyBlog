'use client';

import { NotionRenderer } from 'react-notion-x';
// 必須引入核心 CSS，畫面才會長得像 Notion
import 'react-notion-x/src/styles.css';

export default function NotionRendererView({ recordMap }: { recordMap: any }) {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <NotionRenderer 
        recordMap={recordMap} 
        fullPage={true} // 設為 true 會自動幫你渲染頂部標題與封面大圖
        darkMode={false} // 之後也可以綁定系統的主題色
      />
    </div>
  );
}