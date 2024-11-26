"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Connector } from "wagmi";
import { Profile } from "../context/AuthContext";

export default function TopBar({
  isDarkMode,
  toggleTheme,
  walletAddress,
  activeProfile,
  profiles,
  connect,
  disconnect,
  profileImage,
  connectors,
  setActiveWallet,
}: {
  isDarkMode: boolean;
  toggleTheme: () => void;
  walletAddress: string | null;
  activeProfile: Profile | null;
  profiles: Profile[];
  profileImage: string | null;
  connect: (connector: Connector) => Promise<void>;
  disconnect: () => Promise<void>;
  connectors: readonly Connector[];
  setActiveWallet: (walletAddress: string) => void;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleProfileHover = () => {
    setIsMenuOpen(true);
  };

  const handleProfileLeave = () => {
    setIsMenuOpen(false);
  };

  const handleConnect = async () => {
    if (connectors.length > 0 && !isConnecting) {
      try {
        setIsConnecting(true);
        await connect(connectors[0]); // Attempt to connect using the first connector
      } catch (error) {
        console.error("Wallet connection failed:", error);
      } finally {
        setIsConnecting(false);
      }
    }
  };

  return (
    <div className="topbar flex items-center justify-between px-4 py-2 shadow-lg border-b border-gray-700">
      {/* Left Spacer */}
      <div className="w-1/3"></div>

      {/* Centered Logo */}
      <div className="flex-1 flex justify-center items-center">
        <Image
          src={isDarkMode ? "/images/LOGODARK.png" : "/images/LogoLIGHT.png"}
          alt="Logo"
          width={240}
          height={40}
          className="glitch-effect"
        />
      </div>

      {/* Wallet/Profile Actions */}
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

        {/* Wallet and Profile Section */}
        {walletAddress ? (
          <div
            className="relative"
            onMouseEnter={handleProfileHover}
            onMouseLeave={handleProfileLeave}
          >
            
            <Link href="/profile">
              <Image
                src={profileImage || "/images/default_logo.jpg"}
                alt="Profile Image"
                width={40}
                height={40}
                className="rounded-full cursor-pointer"
              />
            </Link>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10">
                <ul className="py-2">
                  {profiles.map((profile) => (
                    <li
                      key={profile.walletAddress}
                      className={`px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer ${
                        activeProfile?.walletAddress === profile.walletAddress
                          ? "font-bold"
                          : ""
                      }`}
                      onClick={() => setActiveWallet(profile.walletAddress)}
                    >
                      {profile.displayName || profile.username}
                      <br/> <Link href="/settings">Account Settings</Link>
                    </li>
                  ))}
                  <li
                    className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer text-red-500"
                    onClick={disconnect}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={handleConnect}
            className="p-2 rounded-md border border-gray-600 bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
}
