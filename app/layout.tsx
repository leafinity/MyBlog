import type { Metadata } from 'next';
import './globals.css';
import Navbar from '../components/Navbar';
import ScrollToTop from "../components/ScrollToTop";

export const metadata: Metadata = {
  title: "Abby's Journey",
  description: '北歐健行與攝影紀錄',
};

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
        {/* Scroll to top button */}
        <ScrollToTop />
      </body>
    </html>
  );
}