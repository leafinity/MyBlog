import { NotionRenderer } from 'react-notion-x';
import 'react-notion-x/src/styles.css'; 

export default function NotionRendererView({ recordMap }: { recordMap: any }) {
  return (
    <div className="max-w-3xl mx-auto">
      {/* 既然你不必保留原生的 Callout，我們直接用純 CSS 把它們全部變身！ */}
      <style dangerouslySetInnerHTML={{ __html: `        
        /* 1. 隱藏預設圖示，消除原本 Callout 所有的預設樣式 */
        .notion-callout {
          background: transparent !important;
          border: none !important;
          padding: 0 !important;
          margin: 32px 0 !important;
        }
        .notion-callout > .notion-page-icon {
          display: none !important; /* 徹底殺掉左上角的原生圖示 */
        }
        
        /* 2. 畫出左側粉紅線，並設定內部間距避免文字疊在一起 */
        .notion-callout-text {
          border-left: 2px solid #E16B8C !important;
          padding-left: 24px !important;
          margin-left: 12px !important;
          display: flex !important;
          flex-direction: column !important; /* 確保標題和清單乖乖垂直排列 */
        }

        /* 3. 標題三 (灰底卡片上半部) */
        .notion-callout-text .notion-h3 {
          background-color: #f9fafb !important; /* 補上你要的乾淨灰底 */
          padding: 16px 20px 8px 20px !important;
          border-radius: 12px 12px 0 0 !important;
          margin: 0 !important;
          position: relative !important;
          color: #111827 !important;
          font-weight: 700 !important;
        }

        /* 4. 極簡粉紅圓圈 (無 Icon，直接懸浮在線上) */
        .notion-callout-text .notion-h3::before {
          content: '' !important; /* 留空，不要圖示了 */
          position: absolute !important;
          left: -32px !important; /* 精準對齊左側 2px 的粉紅線 */
          top: 22px !important;
          background-color: #E16B8C !important;
          width: 14px !important;
          height: 14px !important;
          border-radius: 50% !important;
          border: 3px solid white !important; /* 白色外框切斷線條的視覺效果 */
        }

        /* 5. 清單 (灰底卡片下半部) */
        .notion-callout-text .notion-ul {
          background-color: #f9fafb !important;
          padding: 0 20px 20px 40px !important; 
          border-radius: 0 0 12px 12px !important;
          margin: 0 !important;
          color: #4b5563 !important;
        }
      `}} />
      <NotionRenderer recordMap={recordMap} />
    </div>
  );
}