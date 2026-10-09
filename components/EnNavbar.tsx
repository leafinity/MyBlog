import Link from 'next/link';

export default function EnNavbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/en" className="flex items-center gap-3 group">
          <img 
            src="/avatar.jpg" 
            alt="Abby's Avatar" 
            className="w-8 h-8 rounded-full object-cover group-hover:scale-105 transition-transform"
          />
          <span className="font-extrabold text-xl tracking-tight text-gray-900 transition-colors">
            <span className="hover:text-brand-pink-main transition-colors">Abby's Journey</span>
          </span>
        </Link>

        {/* 右側：導覽列選單 */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-400">
          <Link href="/en/gallery" className="hover:text-brand-pink-main transition-colors">Instagram</Link>
          <Link href="https://www.instagram.com/abbysresa/" className="hover:text-brand-pink-main transition-colors">Instagram</Link>
          <Link href="/" className="text-sm text-gray-400 hover:text-brand-pink-main transition-colors whitespace-nowrap">
            中文版 (ZH)
          </Link>
        </div>
      </div>
    </nav>
  );
}