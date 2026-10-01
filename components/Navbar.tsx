import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* 左側 Logo */}
        <Link href="/" className="font-extrabold text-xl tracking-tight text-gray-900">
          Abby's Journey
        </Link>

        {/* 右側選單 */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-blue-600 transition-colors">首頁</Link>
          
          {/* 下拉式選單 (Hover 觸發) */}
          <div className="relative group py-6">
            <button className="flex items-center hover:text-blue-600 transition-colors">
              旅遊
              <svg className="w-4 h-4 ml-1 text-gray-400 group-hover:text-blue-600 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* 子選單 (預設隱藏，Hover 時顯示) */}
            <div className="absolute left-0 mt-4 w-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
              <div className="py-2 bg-white rounded-xl shadow-xl border border-gray-100 flex flex-col">
                <Link href="/sw" className="px-4 py-2 hover:bg-gray-50 hover:text-blue-600 transition-colors">瑞典旅遊</Link>
                <Link href="/no" className="px-4 py-2 hover:bg-gray-50 hover:text-blue-600 transition-colors">挪威旅遊</Link>
                <Link href="/eu" className="px-4 py-2 hover:bg-gray-50 hover:text-blue-600 transition-colors">歐洲其他</Link>
              </div>
            </div>
          </div>

          <Link href="/life" className="hover:text-blue-600 transition-colors">生活</Link>
          <Link href="/collectionn" className="hover:text-blue-600 transition-colors">Instagram</Link>
        </div>

      </div>
    </nav>
  );
}