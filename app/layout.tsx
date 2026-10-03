import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Abby's Journey",
  description: "Explore my latest journeys in Sweden, Norway, and beyond. 北歐健行與攝影紀錄",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // lang 可以維持 zh-TW，或者改成 en (如果英文版未來變龐大，可以在 en 裡面另外覆寫)
    <html lang="zh-TW">
      <body className={`${inter.className} bg-[#fafafa] min-h-screen flex flex-col`}>
        {children}
        
      </body>
    </html>
  );
}