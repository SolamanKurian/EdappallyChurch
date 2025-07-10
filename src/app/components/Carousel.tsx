"use client";
import { useEffect, useState } from "react";

const images = [
  "/hero/3.png",
  "/hero/4.png",
  "/hero/6.png",
  "/hero/8.png",
  "/hero/10.png"
];

const carouselContent = [
  {
    title: "Faith That Endures",
    verse: "I give them eternal life, and they shall never perish.",
    reference: "— John 10:28"
  },
  {
    title: "Living Waters Flow Here",
    verse: "The water I give them will become a spring of water welling up to eternal life.",
    reference: "— John 4:14"
  },
  {
    title: "Faith That Endures",
    verse: "I give them eternal life, and they shall never perish.",
    reference: "— John 10:28"
  },
  {
    title: "Living Waters Flow Here",
    verse: "The water I give them will become a spring of water welling up to eternal life.",
    reference: "— John 4:14"
  },
  {
    title: "Faith That Endures",
    verse: "I give them eternal life, and they shall never perish.",
    reference: "— John 10:28"
  }
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    console.log('Carousel current index:', current);
  }, [current]);

  // Autoplay: move to next image every 10 seconds (no fade)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
    }, 10000);
    return () => clearInterval(interval);
  }, [images.length]);

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  return (
    <div className="relative w-full h-full overflow-hidden shadow-lg flex items-center justify-center bg-gray-200">
      <img
        src={images[current]}
        alt={`Slide ${current + 1}`}
        className="w-full h-full object-cover bg-gray-400"
        onLoad={() => console.log(`Image loaded: ${images[current]}`)}
        onError={e => {
          console.error(`Image failed to load: ${images[current]}`);
          const target = e.target as HTMLImageElement;
          // Try to load a fallback image or show a placeholder
          target.style.display = 'none';
          const fallback = document.createElement('div');
          fallback.className = 'w-full h-full bg-gray-400 flex items-center justify-center';
          fallback.innerHTML = '<div class="text-gray-600 text-center"><p>Image not available</p></div>';
          target.parentNode?.appendChild(fallback);
        }}
      />
      {/* Text Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white px-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-wide drop-shadow-2xl" style={{ fontFamily: 'Georgia, serif' }}>
            {carouselContent[current].title}
          </h1>
          <p className="text-xl md:text-2xl mb-2 italic drop-shadow-2xl">
            "{carouselContent[current].verse}"
          </p>
          <p className="text-lg md:text-xl font-semibold drop-shadow-2xl">
            {carouselContent[current].reference}
          </p>
        </div>
      </div>
      
      {/* Animated Down Arrow */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <div className="text-white drop-shadow-2xl">
          <p className="text-lg mb-2">Scroll Down to Hear the Word Shared Recently</p>
          <div className="animate-bounce">
            <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
} 