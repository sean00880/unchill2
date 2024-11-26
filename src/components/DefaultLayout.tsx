// src/components/DefaultLayout.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { useAuthContext } from "../context/AuthContext";

const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const {
    activeWallet,
    walletProfiles,
    connect,
    connectors,
    profileImage,
    disconnect,
    walletAddress,
  } = useAuthContext();
  const router = useRouter();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  // Handle authentication-based redirects
  useEffect(() => {
    if (!activeWallet) {
      router.push("/auth/connect");
    } else if (activeWallet && !walletProfiles[activeWallet]) {
      router.push("/auth/create-profile");
    } else if (activeWallet && walletProfiles[activeWallet]) {
      router.push("/auth/overview");
    }
  }, [activeWallet, walletProfiles, router]);

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        connect={connect}
        connectors={connectors}
        disconnect={disconnect}
        walletAddress={walletAddress}
        profileImage={profileImage}
      />
      <div className="flex flex-1 justify-end">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} isDarkMode={isDarkMode} />
        <main
          className={`transition-all duration-100 ${
            isSidebarOpen ? "md:ml-64 w-[calc(100%-16rem)]" : "md:ml-16 w-[calc(100%-4rem)]"
          } bg-background text-foreground`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;
