"use client";

import { useEffect } from 'react';
import { NotionRenderer } from 'react-notion-x';
import 'react-notion-x/src/styles.css'; 

export default function NotionRendererView({ recordMap }: { recordMap: any }) {
  
  useEffect(() => {
    // 1. 只找 Callout，且精準比對裡面的 Icon 是不是 🗓️
    const callouts = document.querySelectorAll('.notion-callout');
    callouts.forEach(callout => {
      const icon = callout.querySelector('.notion-page-icon');
      if (icon && icon.textContent?.includes('🗓️')) {
        // 2. 幫這個特定的 Callout 貼上我們專屬的標籤，絕對不會影響到其他內容
        callout.classList.add('is-timeline-callout');
      }
    });
  }, [recordMap]);

  return (
    <div className="max-w-3xl mx-auto">
      <style dangerouslySetInnerHTML={{ __html: `
        /* 1. 把這個特定的 Callout 外框與背景變透明 */
        .is-timeline-callout {
          background: transparent !important;
          border: none !important;
          padding: 0 !important;
          margin: 40px 0 !important;
        }
        /* 隱藏原本那個超大的 🗓️ Icon */
        .is-timeline-callout > .notion-page-icon {
          display: none !important; 
        }
        
        /* 2. 把 Callout 的內容區塊左側畫上一條貫穿的 #E16B8C 粉紅線 */
        .is-timeline-callout .notion-callout-text {
          border-left: 2px solid #E16B8C !important;
          padding-left: 24px !important;
          margin-left: 16px !important;
        }

        /* 3. 將 Callout 裡面的【標題三】變成灰色卡片的「上半部」 */
        .is-timeline-callout .notion-h3 {
          background-color: #f9fafb !important;
          padding: 20px 20px 8px 20px !important;
          border-radius: 12px 12px 0 0 !important;
          margin-top: 24px !important;
          position: relative !important;
        }

        /* 4. 畫出懸浮在粉紅線上的可愛圓點 */
        .is-timeline-callout .notion-h3::before {
          content: '🗓️';
          position: absolute;
          left: -41px; /* 精準對齊左側粉紅線 */
          top: 16px;
          background: #E16B8C;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          color: white;
          border: 4px solid white;
        }

        /* 5. 將 Callout 裡面的【清單】變成灰色卡片的「下半部」 */
        .is-timeline-callout .notion-ul {
          background-color: #f9fafb !important;
          padding: 0 20px 24px 40px !important; 
          border-radius: 0 0 12px 12px !important;
          margin-bottom: 24px !important;
        }
      `}} />

      <NotionRenderer recordMap={recordMap} />
    </div>
  );
}