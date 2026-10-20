"use client";

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
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

  const parseCoords = (locStr: string) => {
    if (!locStr || typeof locStr !== 'string' || !locStr.includes(',')) return null;
    const parts = locStr.split(',');
    console.log("split to", parts);
    if (parts.length < 2) return null;
    const lat = parseFloat(parts[0].trim());
    const lng = parseFloat(parts[1].trim());
    if (isNaN(lat) || isNaN(lng)) return null;
    return { lat, lng };
  };

  const validAlbums = albums
    .map(item => ({ ...item, coords: parseCoords(item.location) }))
    .filter(item => item.coords !== null);
  const validPosts = posts
    .map(item => ({ ...item, coords: parseCoords(item.location) }))
    .filter(item => item.coords !== null);

  const allItems = [...validAlbums, ...validPosts];
  const defaultCenter = allItems.length > 0 
    ? [allItems[0].coords.lat, allItems[0].coords.lng] 
    : [25.033, 121.565];

  return (
    <div className="w-full h-[75vh] rounded-2xl overflow-hidden border border-gray-100 bg-white">
      {/* 強制轉型成 any 避開型別衝突 */}
      {React.createElement(
        MapContainer as any,
        {
          center: defaultCenter as [number, number],
          zoom: 3,
          scrollWheelZoom: false,
          style: { width: '100%', height: '100%' },
        },
        [
          React.createElement(TileLayer as any, {
            key: 'tile-layer',
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          }),
          ...validAlbums.map((album) =>
            React.createElement(
              Marker,
              { key: `album-${album.id}`, position: [album.coords.lat, album.coords.lng] },
              React.createElement(
                Popup,
                null,
                React.createElement(
                  'div',
                  { className: 'w-48 p-1' },
                  [
                    album.coverUrl && React.createElement('img', {
                      key: 'img',
                      src: album.coverUrl,
                      alt: lang === 'zh' ? album.titleZH : album.titleEN,
                      className: 'w-full h-28 object-cover rounded-lg mb-2 bg-gray-100',
                    }),
                    React.createElement('p', {
                      key: 'title',
                      className: 'text-xs font-semibold text-gray-900 line-clamp-1 mb-1',
                    }, lang === 'zh' ? album.titleZH : album.titleEN),
                    album.location && React.createElement('p', {
                      key: 'loc',
                      className: 'text-[11px] text-gray-400 mb-2',
                    }, album.location),
                    React.createElement(
                      Link,
                      {
                        key: 'link',
                        href: lang === 'zh' ? `/gallery/${album.slug}` : `/en/gallery/${album.slug}`,
                        className: 'text-xs text-brand-pink-main hover:underline block font-medium',
                      },
                      lang === 'zh' ? '查看相簿 →' : 'View Album →'
                    ),
                  ]
                )
              )
            )
          ),
          ...validPosts.map((post) =>
            React.createElement(
              Marker,
              { key: `post-${post.id}`, position: [post.coords.lat, post.coords.lng] },
              React.createElement(
                Popup,
                null,
                React.createElement(
                  'div',
                  { className: 'w-48 p-1' },
                  [
                    post.coverUrl && React.createElement('img', {
                      key: 'img',
                      src: post.coverUrl,
                      alt: lang === 'zh' ? post.titleZH : post.titleEN,
                      className: 'w-full h-28 object-cover rounded-lg mb-2 bg-gray-100',
                    }),
                    React.createElement('p', {
                      key: 'title',
                      className: 'text-xs font-semibold text-gray-900 line-clamp-1 mb-1',
                    }, lang === 'zh' ? post.titleZH : post.titleEN),
                    post.location && React.createElement('p', {
                      key: 'loc',
                      className: 'text-[11px] text-gray-400 mb-2',
                    }, post.location),
                    React.createElement(
                      Link,
                      {
                        key: 'link',
                        href: lang === 'zh' ? `/${post.slug}` : `/en/${post.slug}`,
                        className: 'text-xs text-brand-pink-main hover:underline block font-medium',
                      },
                      lang === 'zh' ? '閱讀文章 →' : 'Read Post →'
                    ),
                  ]
                )
              )
            )
          ),
        ]
      )}
    </div>
  );
}