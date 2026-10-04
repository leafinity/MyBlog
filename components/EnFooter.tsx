import Link from 'next/link';
import { getPublishedPosts } from '../lib/notion';
import FooterLatestPosts from './FooterLatestPosts';

export default async function Footer() {
  
  const posts = await getPublishedPosts();
  const latestPosts = posts.slice(0, 5);
  
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8 mt-20">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* 品牌、社群與新文章連結 */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
          
          {/* 1. 品牌與社群 */}
          <div className="w-full md:w-1/3">
            <h3 className="text-xl font-extrabold text-gray-900 tracking-tight mb-4">Abby's Journey</h3>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed max-w-sm">
              Explore my latest journeys in Sweden, Norway, and beyond.
            </p>
            <div className="flex space-x-5">
              {/* Instagram */}
              <a href="https://www.instagram.com/abbysresa/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-pink-main transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              
              {/* Threads (使用 @ 符號示意) */}
              <a href="https://www.threads.net/@abbysresa" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-pink-main transition-colors" aria-label="Threads">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </a>

              {/* Google Maps */}
              <a href="https://www.google.com/maps/contrib/112564870217300482962" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-pink-main transition-colors" aria-label="Google Maps">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* 版權宣告與隱私權政策 */}
        <div className="pt-8 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6">
          <p className="text-gray-400 text-xs">
            © {new Date().getFullYear()} Abby's Journey All Images & Content Reserved.
          </p>
          <Link href="/privacy-policy" className="text-brand-pink-main hover:text-brand-pink-light text-xs transition-colors tracking-wide">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}