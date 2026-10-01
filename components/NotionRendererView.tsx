import { NotionRenderer } from 'react-notion-x';
import 'react-notion-x/src/styles.css'; 

export default function NotionRendererView({ recordMap }: { recordMap: any }) {
  return (
    <div className="max-w-3xl mx-auto
      /* ====================================================================
         【魔法時間軸】
         當 react-notion-x 遇到被設定為「粉紅背景」的圖文框時，
         會自動加上 notion-pink_background 這個 class。
         我們就利用這個特徵，將它從平凡的框框魔改成你的專屬時間軸！
         ==================================================================== */
         
      /* 1. 消除原本圖文框的背景與邊框，加上左側 #E16B8C 專屬粉紅邊線 */
      [&_.notion-callout.notion-pink_background]:bg-transparent
      [&_.notion-callout.notion-pink_background]:border-0
      [&_.notion-callout.notion-pink_background]:border-l-2
      [&_.notion-callout.notion-pink_background]:border-[#E16B8C]
      [&_.notion-callout.notion-pink_background]:ml-4
      md:[&_.notion-callout.notion-pink_background]:ml-6
      [&_.notion-callout.notion-pink_background]:pl-8
      md:[&_.notion-callout.notion-pink_background]:pl-10
      [&_.notion-callout.notion-pink_background]:py-2
      [&_.notion-callout.notion-pink_background]:my-10
      
      /* 2. 隱藏原本圖文框自帶的 Icon，讓時間軸視覺更乾淨 */
      [&_.notion-callout.notion-pink_background>.notion-page-icon]:hidden
      
      /* 3. 針對裡面的「標題三 (h3)」加上粉紅圓點與定位 */
      [&_.notion-callout.notion-pink_background_.notion-h3]:relative
      [&_.notion-callout.notion-pink_background_.notion-h3]:text-[#E16B8C]
      [&_.notion-callout.notion-pink_background_.notion-h3]:font-bold
      [&_.notion-callout.notion-pink_background_.notion-h3]:mt-8
      [&_.notion-callout.notion-pink_background_.notion-h3]:before:content-['']
      [&_.notion-callout.notion-pink_background_.notion-h3]:before:absolute
      [&_.notion-callout.notion-pink_background_.notion-h3]:before:w-4
      [&_.notion-callout.notion-pink_background_.notion-h3]:before:h-4
      [&_.notion-callout.notion-pink_background_.notion-h3]:before:bg-[#E16B8C]
      [&_.notion-callout.notion-pink_background_.notion-h3]:before:rounded-full
      [&_.notion-callout.notion-pink_background_.notion-h3]:before:-left-[41px]
      md:[&_.notion-callout.notion-pink_background_.notion-h3]:before:-left-[49px]
      [&_.notion-callout.notion-pink_background_.notion-h3]:before:top-1.5
      [&_.notion-callout.notion-pink_background_.notion-h3]:before:ring-4
      [&_.notion-callout.notion-pink_background_.notion-h3]:before:ring-white
      
      /* 4. 確保內文與清單文字的顏色質感 */
      [&_.notion-callout.notion-pink_background_.notion-text]:text-gray-700
      [&_.notion-callout.notion-pink_background_.notion-ul]:text-gray-700
    ">
      <NotionRenderer recordMap={recordMap} />
    </div>
  );
}