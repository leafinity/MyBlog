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
      {/* 將 Navbar 放在 body 的最上方 */}
      <EnNavbar />
        
      {/* 這個 children 會自動替換成你各個頁面 (page.tsx) 的內容 */}
      <main>{children}</main>
        
      <EnFooter />
    </>
  );
}