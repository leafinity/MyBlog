import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 深一點的主色
        'brand-pink-main': '#E16B8C', 
        // 淺一點的副色
        'brand-pink-light': '#F596AA',
      }
    }
  },
  plugins: [],
};
export default config;