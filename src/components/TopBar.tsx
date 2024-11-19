"use client";

import { useState } from "react";
import Image from "next/image";

export default function TopBar({ isDarkMode, toggleTheme }: { isDarkMode: boolean; toggleTheme: () => void }) {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    setIsConnected(!isConnected);
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

      {/* Connect Button & Theme Toggle */}
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

        {/* Connect Button */}
        <button
          onClick={handleConnect}
          className={`btn-connect px-4 py-2 rounded-md text-sm transition-all duration-300 ${
            isConnected ? "bg-yellow-500" : "bg-blue-500"
          } hover:bg-blue-600`}
        >
          {isConnected ? "Connected" : "Connect"}
        </button>
      </div>
    </div>
  );
}
