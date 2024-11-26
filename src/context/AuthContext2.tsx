"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { Connector, useConnect, useDisconnect } from "wagmi";
import { wagmiAdapter, projectId } from "../lib/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { createAppKit } from "@reown/appkit";
import { mainnet, base, bsc } from "@reown/appkit/networks";
import { useAppKitAccount } from "@reown/appkit/react";

// Initialize AppKit
export const appKit = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [mainnet, base, bsc],
  defaultNetwork: mainnet,
  features: {
    analytics: true,
    email: true,
    socials: ["google", "x", "discord"],
  },
});

// Create a QueryClient instance
const queryClient = new QueryClient();

interface AuthContextType {
  displayName: string;
  setDisplayName: (name: string) => void;
  username: string;
  setUsername: (name: string) => void;
  about: string;
  setAbout: (about: string) => void;
  profileImage: string | null;
  setProfileImage: (image: string | null) => void;
  bannerImage: string | null;
  setBannerImage: (image: string | null) => void;
  walletAddress: string | null;
  accountIdentifier: string | null;
  isVerified: boolean;
  setIsVerified: (verified: boolean) => void;
  logout: () => void;
  connect: (connector: Connector) => Promise<void>;
  connectors: readonly Connector[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
  cookies?: string | null;
};

export const AuthProvider = ({ children, cookies }: AuthProviderProps) => {
  const { disconnect } = useDisconnect();
  const { connect, connectors } = useConnect();
  const { address, isConnected, caipAddress } = useAppKitAccount();
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string>(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("displayName") || "";
  });

  const [username, setUsername] = useState<string>(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("username") || "";
  });

  const [about, setAbout] = useState<string>(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("about") || "";
  });

  const [profileImage, setProfileImage] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("profileImage") || null;
  });

  const [bannerImage, setBannerImage] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("bannerImage") || null;
  });

  const [isVerified, setIsVerified] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("isVerified") === "true";
  });

  const [accountIdentifier, setAccountIdentifier] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("accountIdentifier") || null;
  });

  useEffect(() => {
    if (isConnected && caipAddress) {
      setAccountIdentifier(caipAddress);
      if (typeof window !== "undefined") {
        localStorage.setItem("accountIdentifier", caipAddress);
      }
    }
  }, [isConnected, caipAddress]);

  useEffect(() => {
    if (cookies) {
      console.log("Cookies received:", cookies);
    }
  }, [cookies]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("displayName", displayName);
    }
  }, [displayName]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("username", username);
    }
  }, [username]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("about", about);
    }
  }, [about]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (profileImage) {
        localStorage.setItem("profileImage", profileImage);
      } else {
        localStorage.removeItem("profileImage");
      }
    }
  }, [profileImage]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (bannerImage) {
        localStorage.setItem("bannerImage", bannerImage);
      } else {
        localStorage.removeItem("bannerImage");
      }
    }
  }, [bannerImage]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("isVerified", isVerified.toString());
    }
  }, [isVerified]);

  useEffect(() => {
    if (isConnected && accountIdentifier) {
      // Load profile data from database or localStorage
      setDisplayName(localStorage.getItem("displayName") || "");
      setUsername(localStorage.getItem("username") || "");
    }
  }, [isConnected, accountIdentifier]);

  const logout = () => {
    setDisplayName("");
    setUsername("");
    setAbout("");
    setProfileImage(null);
    setBannerImage(null);
    setIsVerified(false);
    setAccountIdentifier(null);

    if (typeof window !== "undefined") {
      localStorage.clear();
    }

    disconnect();
  };

  const handleConnect = async (connector: Connector): Promise<void> => {
    try {
      await connect({ connector });
    } catch (error) {
      console.error("Connection failed:", error);
      setAlertMessage("Wallet connection failed. Please try again.");
    }
  };
  

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider
          value={{
            displayName,
            setDisplayName,
            username,
            setUsername,
            about,
            setAbout,
            profileImage,
            setProfileImage,
            bannerImage,
            setBannerImage,
            walletAddress: address ?? null,
            accountIdentifier,
            isVerified,
            setIsVerified,
            logout,
            connect: handleConnect,
            connectors,
          }}
        >
          {children}
        </AuthContext.Provider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuthContext must be used within an AuthProvider");
  return context;
};
