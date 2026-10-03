import Link from 'next/link';
// 不需要引入 NavbarEn 或 Footer 了！

export default function EnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>      <header className="max-w-4xl mx-auto px-6 py-8 flex justify-between items-center">
        <span className="font-extrabold text-xl tracking-tight text-gray-900">
          Abby's Journey
        </span>
        <Link href="/" className="text-sm text-gray-400 hover:text-[#DC9FB4] transition-colors">
          中文版 (ZH)
        </Link>
      </header>

      {/* 這是文章內容區塊 */}
      <main className="flex-grow pb-20">{children}</main>
    </>
  );
}