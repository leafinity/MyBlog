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

const albumIcon = L.divIcon({
  className: 'album-map-marker',
  html: `
    <div style="
      width: 16px;
      height: 16px;
      background-color: #E16B8C;
      border: 3px solid #ffffff;
      border-radius: 50%;
      box-shadow: 0 2px 6px rgba(0,0,0,0.25);
    "></div>
  `,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
  popupAnchor: [0, -10],
});

const postIcon = L.divIcon({
  className: 'post-map-marker',
  html: `
    <div style="
      width: 14px;
      height: 14px;
      background-color: #C45573;
      border: 3px solid #ffffff;
      border-radius: 4px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.25);
    "></div>
  `,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
  popupAnchor: [0, -9],
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
  const defaultCenter = [59.326, 18.056];
  const defaultZoom = 5

  return (
    <div className="w-full h-[75vh] rounded-2xl overflow-hidden border border-gray-100 bg-white">
      {/* 強制轉型成 any 避開型別衝突 */}
      {React.createElement(
        MapContainer as any,
        {
          center: defaultCenter as [number, number],
          zoom: defaultZoom,
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
              Marker as any,
              { key: `album-${album.id}`, position: [album.coords.lat, album.coords.lng], icon: albumIcon },
              React.createElement(
                Popup,
                null,
                React.createElement(
                  'div',
                  { 
                    className: 'w-52 p-3 bg-white/90 backdrop-blur-md rounded-xl shadow-xl border border-white/60 cursor-pointer group relative',
                    onClick: () => {
                      const url = lang === 'zh' ? `/gallery/${album.slug}` : `/en/gallery/${album.slug}`;
                      window.location.href = url;
                    }
                  },
                  [
                    React.createElement('button', {
                      key: 'close-btn',
                      className: 'absolute top-2 right-2 w-7 h-7 bg-gray-100/80 hover:bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm z-20',
                      onClick: (e: any) => {
                        e.stopPropagation();
                        const closeBtn = document.querySelector('.leaflet-popup-close-button') as HTML HTMLElement;
                        const mapContainer = document.querySelector('.leaflet-container');
                        if (mapContainer) {
                          document.body.click();
                        }
                      }
                    }, '✕'),
                    album.coverUrl && React.createElement('div', {
                      key: 'img-wrapper',
                      className: 'w-full h-32 overflow-hidden rounded-lg mb-3 bg-gray-100 relative',
                    }, [
                      React.createElement('img', {
                        key: 'img',
                        src: album.coverUrl,
                        alt: lang === 'zh' ? album.titleZH : album.titleEN,
                        className: 'w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out',
                      })
                    ]),
                    React.createElement('p', {
                      key: 'title',
                      className: 'text-xs font-semibold text-gray-900 line-clamp-2 mb-1 group-hover:text-brand-pink-main transition-colors',
                    }, lang === 'zh' ? album.titleZH : album.titleEN),
                    
                    album.date && React.createElement('p', {
                      key: 'date',
                      className: 'text-[11px] text-gray-400 mb-2',
                    }, album.date.slice(0, 7)),
                  ]
                )
              )
            )
          ),
          ...validPosts.map((post) =>
            React.createElement(
              Marker as any,
              { key: `post-${post.id}`, position: [post.coords.lat, post.coords.lng], icon: postIcon },
              React.createElement(
                Popup,
                null,
                React.createElement(
                  'div',
                  { 
                    className: 'w-52 p-3 bg-white rounded-xl shadow-xl border border-gray-100 cursor-pointer group relative',
                    onClick: () => {
                      const url = lang === 'zh' ? `/${post.slug}` : `/en/${post.slug}`;
                      window.location.href = url;
                    }
                  },
                  [
                    post.coverUrl && React.createElement('div', {
                      key: 'img-wrapper',
                      className: 'w-full h-32 overflow-hidden rounded-lg mb-3 bg-gray-100 relative',
                    }, [
                      React.createElement('img', {
                        key: 'img',
                        src: post.coverUrl,
                        alt: post.title,
                        className: 'w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out',
                      })
                    ]),
                    React.createElement('p', {
                      key: 'title',
                      className: 'text-xs font-semibold text-gray-900 line-clamp-1 mb-1 group-hover:text-brand-pink-main transition-colors',
                    }, post.title),
                    
                    post.date && React.createElement('p', {
                      key: 'date',
                      className: 'text-[11px] text-gray-400 mb-2',
                    }, post.date),
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