'use client';
import { NotionRenderer } from 'react-notion-x';
import 'react-notion-x/src/styles.css';

export default function NotionRendererView({ recordMap }: { recordMap: any }) {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <style jsx global>{`
        .notion-header { display: none !important; }
      `}</style>
      <NotionRenderer 
        recordMap={recordMap} 
        fullPage={true} 
        darkMode={false}
      />
    </div>
  );
}