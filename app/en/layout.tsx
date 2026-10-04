import Link from 'next/link';
import EnFooter from "../../components/EnFooter";

export default function EnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>     
      <header className="max-w-4xl mx-auto px-6 py-8 flex items-center justify-end gap-6">
        <Link href="/" className="flex items-center gap-3 group">
          <img 
            src="/avatar.jpg" 
            alt="Abby's Avatar" 
            className="w-8 h-8 rounded-full object-cover group-hover:scale-105 transition-transform"
          />
          <span className="font-extrabold text-xl tracking-tight text-gray-900 transition-colors">
            <span className="hover:text-brand-pink-main transition-colors">Abby's Journey</span>
          </span>
        </Link>
        <Link href="/" className="text-sm text-gray-400 hover:text-[#DC9FB4] transition-colors whitespace-nowrap">
          中文版 (ZH)
        </Link>
      </header>


      {/* 這是文章內容區塊 */}
      <main className="flex-grow pb-20">{children}</main>

      <EnFooter />
    </>
  );
}