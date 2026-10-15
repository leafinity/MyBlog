"use client";

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';

// 修正 Leaflet 預設 icon 路徑
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function JourneyMap({ 
  albums = [], 
  posts = [], 
  lang = 'zh' 
}: { 
  albums: any[], 
  posts: any[], 
  lang?: 'zh' | 'en' 
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="w-full h-[75vh] bg-gray-50 animate-pulse rounded-2xl" />;
  }

  // 分別過濾出有座標的項目
  const validAlbums = albums.filter(item => item.coords && typeof item.coords.lat === 'number' && typeof item.coords.lng === 'number');
  const validPosts = posts.filter(item => item.coords && typeof item.coords.lat === 'number' && typeof item.coords.lng === 'number');

  // 決定地圖預設中心點
  const allItems = [...validAlbums, ...validPosts];
  const defaultCenter = allItems.length > 0 
    ? [allItems[0].coords.lat, allItems[0].coords.lng] 
    : [25.033, 121.565];

  return (
    <div className="w-full h-[75vh] rounded-2xl overflow-hidden border border-gray-100 bg-white">
      {/* @ts-ignore */}
      <MapContainer 
        center={defaultCenter as [number, number]} 
        zoom={3} 
        scrollWheelZoom={false}
        style={{ width: '100%', height: '100%' }}
      >
        {/* @ts-ignore */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {/* 渲染相簿 Marker */}
        {validAlbums.map((album) => (
          <Marker key={`album-${album.id}`} position={[album.coords.lat, album.coords.lng]}>
            <Popup>
              <div className="w-48 p-1">
                {album.cover && (
                  <img 
                    src={album.cover} 
                    alt={lang === 'zh' ? album.titleZH : album.titleEN} 
                    className="w-full h-28 object-cover rounded-lg mb-2 bg-gray-100" 
                  />
                )}
                <p className="text-xs font-semibold text-gray-900 line-clamp-1 mb-1">
                  {lang === 'zh' ? album.titleZH : album.titleEN}
                </p>
                <p className="text-[11px] text-gray-400 mb-2">
                  {album.location}
                </p>
                <Link 
                  href={`/${lang}/gallery/${album.slug}`}
                  className="text-xs text-brand-pink-main hover:underline block font-medium"
                >
                  {lang === 'zh' ? '查看相簿 →' : 'View Album →'}
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* 渲染文章 Marker */}
        {validPosts.map((post) => (
          <Marker key={`post-${post.id}`} position={[post.coords.lat, post.coords.lng]}>
            <Popup>
              <div className="w-48 p-1">
                {post.cover && (
                  <img 
                    src={post.cover} 
                    alt={lang === 'zh' ? post.titleZH : post.titleEN} 
                    className="w-full h-28 object-cover rounded-lg mb-2 bg-gray-100" 
                  />
                )}
                <p className="text-xs font-semibold text-gray-900 line-clamp-1 mb-1">
                  {lang === 'zh' ? post.titleZH : post.titleEN}
                </p>
                <p className="text-[11px] text-gray-400 mb-2">
                  {post.location}
                </p>
                <Link 
                  href={`/${lang}/${post.slug}`}
                  className="text-xs text-brand-pink-main hover:underline block font-medium"
                >
                  {lang === 'zh' ? '閱讀文章 →' : 'Read Post →'}
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}