"use client";
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { Connector, useConnect, useDisconnect } from "wagmi";
import { wagmiAdapter, projectId } from "../lib/config"; // Import wagmiAdapter and projectId
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { createAppKit } from "@reown/appkit";
import { mainnet, base, bsc } from "@reown/appkit/networks";
import { useAppKitAccount } from "@reown/appkit/react"; // Import useAppKitAccount for account details

// Initialize AppKit with the wagmiAdapter and project ID
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

// Create a new instance of QueryClient for TanStack Query
const queryClient = new QueryClient();

interface AuthContextType {
  displayName: string;
  setDisplayName: (name: string) => void;
  username: string;
  setUsername: (name: string) => void;
  profileImage: string | null;
  setProfileImage: (image: string | null) => void;
  walletAddress: string | null;
  accountIdentifier: string | null; // Include the account identifier in the context
  isVerified: boolean;
  setIsVerified: (verified: boolean) => void;
  logout: () => void;
  connect: (connector: Connector) => Promise<void>;
  connectors: readonly Connector[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
  cookies?: string | null; // Optional cookies prop
};

export const AuthProvider = ({ children, cookies }: AuthProviderProps) => {
  const { disconnect } = useDisconnect();
  const { connect, connectors } = useConnect();
  const { address, isConnected, caipAddress } = useAppKitAccount(); // Fetch account details

  const [displayName, setDisplayName] = useState<string>(() => (typeof window !== "undefined" ? localStorage.getItem("displayName") || "" : ""));
  const [username, setUsername] = useState<string>(() => (typeof window !== "undefined" ? localStorage.getItem("username") || "" : ""));
  const [profileImage, setProfileImage] = useState<string | null>(() => (typeof window !== "undefined" ? localStorage.getItem("profileImage") || null : null));
  const [isVerified, setIsVerified] = useState<boolean>(() => (typeof window !== "undefined" ? localStorage.getItem("isVerified") === "true" : false));
  const [accountIdentifier, setAccountIdentifier] = useState<string | null>(null); // State for account identifier

  // Effect to handle account identifier synchronization
  useEffect(() => {
    if (isConnected && caipAddress) {
      setAccountIdentifier(caipAddress);
      if (typeof window !== "undefined") {
        localStorage.setItem("accountIdentifier", caipAddress); // Store the identifier in localStorage
      }
      console.log("Account Identifier updated:", caipAddress); // Log the account identifier
    }
  }, [isConnected, caipAddress]);

  // Effect to handle cookies
  useEffect(() => {
    if (cookies) {
      console.log("Cookies:", cookies);
    }
  }, [cookies]);

  // Synchronize displayName with localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("displayName", displayName);
    }
  }, [displayName]);

  // Synchronize username with localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("username", username);
    }
  }, [username]);

  // Synchronize profileImage with localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (profileImage) {
        localStorage.setItem("profileImage", profileImage);
      } else {
        localStorage.removeItem("profileImage");
      }
    }
  }, [profileImage]);

  // Synchronize isVerified with localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("isVerified", isVerified.toString());
    }
  }, [isVerified]);

  const logout = () => {
    setDisplayName("");
    setUsername("");
    setProfileImage(null);
    setIsVerified(false);
    setAccountIdentifier(null); // Clear the account identifier on logout
    disconnect();
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
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
            accountIdentifier, // Provide the account identifier to the context
            isVerified,
            setIsVerified,https://t.me/DaffyCoinSolana
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
