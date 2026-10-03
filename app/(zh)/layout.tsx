import Navbar from '../../components/Navbar';
import ScrollToTop from "../../components/ScrollToTop";
import Footer from "../../components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <body className="bg-gray-50 text-gray-900 antialiased">
        {/* 將 Navbar 放在 body 的最上方 */}
        <Navbar />
        
        {/* 這個 children 會自動替換成你各個頁面 (page.tsx) 的內容 */}
        <main>{children}</main>
        
        <Footer />

        {/* Scroll to top button */}
        <ScrollToTop />
      </body>
    </html>
  );
}