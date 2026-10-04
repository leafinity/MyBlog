import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ScrollToTop from "../components/ScrollToTop";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Abby's Journey",
  description: "Explore my latest journeys in Sweden, Norway, and beyond. 北歐健行與攝影紀錄",
  icons: {
    icon: '/favicon.png', 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // lang 可以維持 zh-TW，或者改成 en (如果英文版未來變龐大，可以在 en 裡面另外覆寫)
    <html lang="zh-TW">
      <body className="bg-gray-50 text-gray-900 antialiased">
        {children}

        {/* Scroll to top button */}
        <ScrollToTop />
      </body>
    </html>
  );
}