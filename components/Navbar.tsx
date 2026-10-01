// components/Navbar.tsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* 左側 Logo */}
        <Link href="/" className="font-extrabold text-xl tracking-tight text-gray-900">
          Abby's Journey
        </Link>

        {/* 右側選單 (在手機版會自動隱藏，可後續再做漢堡選單) */}
        <div className="hidden md:flex space-x-6 text-sm font-medium text-gray-600">
          <Link href="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
          <Link href="/sw" className="hover:text-blue-600 transition-colors">瑞典旅遊</Link>
          <Link href="/no" className="hover:text-blue-600 transition-colors">挪威旅遊</Link>
          <Link href="/eu" className="hover:text-blue-600 transition-colors">歐洲其他</Link>
          <Link href="/life" className="hover:text-blue-600 transition-colors">瑞典生活</Link>
          <Link href="/map" className="hover:text-blue-600 transition-colors">Map</Link>
          <Link href="/collectionn" className="hover:text-blue-600 transition-colors">Instagram</Link>
        </div>
      </div>
    </nav>
  );
}