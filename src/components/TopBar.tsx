'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuthContext } from '../context/AuthContext'; // Import your context hook

export default function TopBar({ isDarkMode, toggleTheme }: { isDarkMode: boolean; toggleTheme: () => void }) {
  const { walletAddress, profileImage } = useAuthContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleProfileHover = () => {
    setIsMenuOpen(true);
  };

  const handleProfileLeave = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="topbar flex items-center justify-between px-4 py-2 shadow-lg border-b border-gray-700">
      {/* Left Spacer */}
      <div className="w-1/3"></div>

      {/* Centered Logo Container */}
      <div className="flex-1 flex justify-center items-center">
        <Image
          src={isDarkMode ? "/images/LOGODARK.png" : "/images/LogoLIGHT.png"} // Conditional logo path
          alt="Logo"
          width={240}
          height={40}
          className="glitch-effect"
        />
      </div>

      {/* Connect Button & Profile Image */}
      <div className="w-1/3 flex justify-end items-center space-x-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full border border-gray-600 transition ${
            isDarkMode ? "bg-[#090909] text-white" : "bg-white text-black"
          }`}
        >
          {isDarkMode ? "☀️" : "🌙"}
        </button>

        {/* Profile Image or Connect Button */}
        {walletAddress ? (
          <div
            className="relative"
            onMouseEnter={handleProfileHover}
            onMouseLeave={handleProfileLeave}
          >
            <Link href="/profile">
              <Image
                src={profileImage || "/images/default-profile.png"} // Fallback to default image
                alt="Profile Image"
                width={40}
                height={40}
                className="rounded-full cursor-pointer"
              />
            </Link>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10">
                <ul className="py-2">
                  <li className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">Account Settings</li>
                  <li className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">Logout</li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          // Use the <appkit-button> component for wallet and email connection
          <w3m-button/>
        )}
      </div>
    </div>
  );
}
