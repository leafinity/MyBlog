import Link from 'next/link';
import EnNavbar from '../../components/EnNavbar';
import EnFooter from "../../components/EnFooter";

export default function EnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>     
      <header className="max-w-4xl mx-auto px-6 py-8 flex items-center justify-end gap-6">
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
      </header>

      <main>{children}</main>

      <EnFooter />
    </>
  );
}

export default function EnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* 將 Navbar 放在 body 的最上方 */}
      <EnNavbar />
        
      {/* 這個 children 會自動替換成你各個頁面 (page.tsx) 的內容 */}
      <main>{children}</main>
        
      <EnFooter />
  </>
  );
}