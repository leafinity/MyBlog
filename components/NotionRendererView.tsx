import { NotionRenderer } from 'react-notion-x';
import 'react-notion-x/src/styles.css'; 

// 建立元件攔截規則
const customComponents = {
  callout: (props: any) => {
    const icon = props.block.format?.page_icon;
    if (icon === '🗓️') {
      return (
        <div className="relative border-l-2 border-[#E16B8C] ml-4 md:ml-6 pl-8 md:pl-10 py-2 my-10 
          /* 核心魔法：自動幫裡面的「標題三」加上粉紅圓點與左側定位 */
          [&_.notion-h3]:relative [&_.notion-h3]:text-[#E16B8C] [&_.notion-h3]:font-bold [&_.notion-h3]:mt-8
          [&_.notion-h3]:before:content-[''] [&_.notion-h3]:before:absolute 
          [&_.notion-h3]:before:w-4 [&_.notion-h3]:before:h-4 [&_.notion-h3]:before:bg-[#E16B8C] 
          [&_.notion-h3]:before:rounded-full [&_.notion-h3]:before:-left-[41px] md:[&_.notion-h3]:before:-left-[49px]
          [&_.notion-h3]:before:top-1.5 [&_.notion-h3]:before:ring-4 [&_.notion-h3]:before:ring-white
          
          /* 調整時間軸內的一般文字與清單顏色 */
          [&_.notion-text]:text-gray-700 [&_.notion-ul]:text-gray-700">
          
          {/* react-notion-x 會自動把你在框框裡打的字渲染出來，我們只負責外觀 */}
          {props.children}
        </div>
      );
    }
    
    // 如果是普通的圖文框，就維持一般的卡片樣式
    return (
      <div className="flex bg-gray-50 rounded-xl p-5 my-6 border border-gray-100">
        {icon && <div className="text-xl mr-4">{icon}</div>}
        <div className="w-full text-gray-700">{props.children}</div>
      </div>
    );
  }
};

export default function NotionRendererView({ recordMap }: { recordMap: any }) {
  return (
    <div className="max-w-3xl mx-auto">
      <NotionRenderer 
        recordMap={recordMap} 
        components={customComponents} 
      />
    </div>
  );
}