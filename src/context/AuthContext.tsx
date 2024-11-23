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
  profileImage: string | null;
  setProfileImage: (image: string | null) => void;
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

  const [displayName, setDisplayName] = useState<string>(() => {
    if (typeof window === "undefined") return "";
    try {
      return localStorage.getItem("displayName") || "";
    } catch (error) {
      console.error("Failed to load displayName from localStorage:", error);
      return "";
    }
  });

  const [username, setUsername] = useState<string>(() => {
    if (typeof window === "undefined") return "";
    try {
      return localStorage.getItem("username") || "";
    } catch (error) {
      console.error("Failed to load username from localStorage:", error);
      return "";
    }
  });

  const [profileImage, setProfileImage] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      return localStorage.getItem("profileImage") || null;
    } catch (error) {
      console.error("Failed to load profileImage from localStorage:", error);
      return null;
    }
  });

  const [isVerified, setIsVerified] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      return localStorage.getItem("isVerified") === "true";
    } catch (error) {
      console.error("Failed to load isVerified from localStorage:", error);
      return false;
    }
  });

  const [accountIdentifier, setAccountIdentifier] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      return localStorage.getItem("accountIdentifier") || null;
    } catch (error) {
      console.error("Failed to load accountIdentifier from localStorage:", error);
      return null;
    }
  });

  useEffect(() => {
    if (isConnected && caipAddress) {
      setAccountIdentifier(caipAddress);
      try {
        if (typeof window !== "undefined") {
          localStorage.setItem("accountIdentifier", caipAddress);
        }
      } catch (error) {
        console.error("Failed to save accountIdentifier to localStorage:", error);
      }
    }
  }, [isConnected, caipAddress]);

  useEffect(() => {
    if (cookies) {
      console.log("Cookies received:", cookies);
    }
  }, [cookies]);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("displayName", displayName);
      }
    } catch (error) {
      console.error("Failed to save displayName to localStorage:", error);
    }
  }, [displayName]);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("username", username);
      }
    } catch (error) {
      console.error("Failed to save username to localStorage:", error);
    }
  }, [username]);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        if (profileImage) {
          localStorage.setItem("profileImage", profileImage);
        } else {
          localStorage.removeItem("profileImage");
        }
      }
    } catch (error) {
      console.error("Failed to save or remove profileImage in localStorage:", error);
    }
  }, [profileImage]);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("isVerified", isVerified.toString());
      }
    } catch (error) {
      console.error("Failed to save isVerified to localStorage:", error);
    }
  }, [isVerified]);

  const logout = () => {
    setDisplayName("");
    setUsername("");
    setProfileImage(null);
    setIsVerified(false);
    setAccountIdentifier(null);

    try {
      if (typeof window !== "undefined") {
        localStorage.clear();
      }
    } catch (error) {
      console.error("Failed to clear localStorage during logout:", error);
    }

    disconnect();
  };

  const handleConnect = async (connector: Connector): Promise<void> => {
    try {
      await connect({ connector });
    } catch (error) {
      console.error("Connection failed:", error);
      throw error;
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
            profileImage,
            setProfileImage,
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
