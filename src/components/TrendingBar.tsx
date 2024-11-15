"use client";
// src/components/TrendingBar.tsx
import { useRef, useEffect } from 'react';
import Image from 'next/image';

export default function TrendingBar({ isDarkMode }: { isDarkMode: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll effect
  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const scrollWidth = container.scrollWidth;

      let scrollAmount = 0;
      const scroll = () => {
        scrollAmount += 1;
        if (scrollAmount >= scrollWidth / 2) {
          scrollAmount = 0; // Reset scroll position halfway through for smooth looping
        }
        container.scrollLeft = scrollAmount;
      };

      const scrollInterval = setInterval(scroll, 20); // Adjust the speed as needed
      return () => clearInterval(scrollInterval);
    }
  }, []);

  const trendingItems = [
    { id: 1, name: 'DACAT', logo: '/logos/dacat.png' },
    { id: 2, name: 'GINU', logo: '/logos/ginu.png' },
    { id: 3, name: 'SATO', logo: '/logos/sato.png' },
    { id: 4, name: 'DACAT', logo: '/logos/dacat.png' },
    { id: 5, name: 'GINU', logo: '/logos/ginu.png' },
    { id: 6, name: 'SATO', logo: '/logos/sato.png' },
    { id: 7, name: 'DACAT', logo: '/logos/dacat.png' },
    { id: 8, name: 'GINU', logo: '/logos/ginu.png' },
    { id: 9, name: 'SATO', logo: '/logos/sato.png' },
  ];

  return (
    <div className="relative overflow-hidden flex items-center w-full bg-black p-2">
      <div
        className="trending-title px-4 text-xl flex-shrink-0 z-10"
        style={{
          width: '15%',
          background: isDarkMode
            ? 'linear-gradient(90deg, #1a1a1a 60%, transparent 90%)'
            : 'linear-gradient(90deg, #ffffff 70%, transparent 90%)',
          color: isDarkMode ? '#ffffff' : '#000000',
          clipPath: 'polygon(0 0, 90% 0, 100% 100%, 0% 100%)',
        }}
      >
        Trending Influencers
      </div>
      <div
        ref={containerRef}
        className="marquee-container flex items-center whitespace-nowrap w-full z-2"
        style={{
          display: 'inline-flex',
        }}
      >
        {/* Render items twice for seamless looping */}
        {[...trendingItems, ...trendingItems].map((item, index) => (
          <div key={index} className="flex items-center mx-2">
            <Image src={item.logo} alt={item.name} width={30} height={30} />
            <span
              className="ml-2"
              style={{
                color: isDarkMode ? '#ffffff' : '#000000',
              }}
            >
              {item.name}
            </span>
          </div>
        ))}
      </div>
      <style jsx>{`
        .marquee-container {
          animation: marquee 30s linear infinite;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%); /* Moves halfway so the duplicated items continue the loop */
          }
        }

        .marquee-container:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
