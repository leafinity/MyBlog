import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 深一點的主色：用於標題 Hover 與「閱讀全文」
        'brand-pink-main': '#E16B8C', 
        // 淺一點的副色：用於日期、標籤等小字
        'brand-pink-light': '#F4A7B9',
      }
    }
  },
  plugins: [],
};
export default config;