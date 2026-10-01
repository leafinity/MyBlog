import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* 左側：大頭貼 + Abby's Journey */}
        <Link href="/" className="flex items-center gap-3 group">
          <img 
            src="/avatar.jpg" 
            alt="Abby's Avatar" 
            className="w-8 h-8 rounded-full object-cover group-hover:scale-105 transition-transform"
          />
          {/* 使用你專屬的 #E16B8C 作為 hover 顏色 */}
          <span className="font-extrabold text-xl tracking-tight text-gray-900 transition-colors" style={{ '--hover-color': '#E16B8C' } as React.CSSProperties}>
            <span className="hover:text-[var(--hover-color)] transition-colors">Abby's Journey</span>
          </span>
        </Link>

        {/* 右側：導覽列選單 */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
          <Link href="/" className="transition-colors hover:text-[#E16B8C]">首頁</Link>
          
          {/* 下拉式選單：旅遊 */}
          <div className="relative group py-6">
            <button className="flex items-center transition-colors cursor-pointer hover:text-[#E16B8C]">
              旅遊
              <svg className="w-4 h-4 ml-1 text-gray-400 group-hover:text-[#E16B8C] transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* 子選單 */}
            <div className="absolute right-0 top-full mt-[-8px] w-36 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
              <div className="py-2 bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col text-center">
                <Link href="/sw" className="px-4 py-2 hover:bg-gray-50 hover:text-[#E16B8C] transition-colors">瑞典旅遊</Link>
                <Link href="/no" className="px-4 py-2 hover:bg-gray-50 hover:text-[#E16B8C] transition-colors">挪威旅遊</Link>
                <Link href="/eu" className="px-4 py-2 hover:bg-gray-50 hover:text-[#E16B8C] transition-colors">歐洲其他</Link>
              </div>
            </div>
          </div>

          <Link href="/life" className="hover:text-[#E16B8C] transition-colors">生活</Link>
          <Link href="/collectionn" className="hover:text-[#E16B8C] transition-colors">Instagram</Link>
        </div>
      </div>
    </nav>
  );
}