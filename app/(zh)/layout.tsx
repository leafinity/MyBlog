import Navbar from '../../components/Navbar';
import Footer from "../../components/Footer";

export default function ZhLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* 將 Navbar 放在 body 的最上方 */}
      <Navbar />
        
      {/* 這個 children 會自動替換成你各個頁面 (page.tsx) 的內容 */}
      <main>{children}</main>
        
      <Footer />
    </>
  );
}