"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { Connector, useConnect, useDisconnect } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { wagmiAdapter, projectId } from "../lib/config";
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

interface Profile {
  displayName: string;
  username: string;
  profileImage: string | null;
}

interface AuthContextType {
  walletAddress: string | null;
  accountIdentifier: string | null;
  profiles: Record<string, Profile>;
  walletProfiles: Record<string, Profile>;
  activeWallet: string | null;
  profileImage: string | null;
  activeProfile: Profile | null;
  setActiveWallet: (walletAddress: string) => void;
  connect: (connector: Connector) => Promise<void>;
  disconnect: () => Promise<void>;
  connectors: readonly Connector[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { disconnect: wagmiDisconnect } = useDisconnect();
  const { connect, connectors } = useConnect();
  const { address, isConnected, caipAddress } = useAppKitAccount();

  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [accountIdentifier, setAccountIdentifier] = useState<string | null>(null);
  const [profiles, setProfiles] = useState<Record<string, Profile>>({});
  const [activeWallet, setActiveWallet] = useState<string | null>(null);
  const [activeProfile, setActiveProfile] = useState<Profile | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Alias for compatibility
  const walletProfiles = profiles;

  // Automatically synchronize wallet connection
  useEffect(() => {
    if (isConnected && address) {
      setWalletAddress(address);
    }
  }, [isConnected, address]);

  // Set accountIdentifier and update active wallet/profile when connected
  useEffect(() => {
    if (isConnected && caipAddress) {
      setAccountIdentifier(caipAddress);

      // Load or initialize profiles from localStorage or API
      const storedProfiles = JSON.parse(localStorage.getItem("profiles") || "{}");
      setProfiles(storedProfiles);

      // Set the active profile and image based on the active wallet
      if (address && storedProfiles[address]) {
        setActiveWallet(address);
        setActiveProfile(storedProfiles[address]);
        setProfileImage(storedProfiles[address].profileImage);
      }
    }
  }, [isConnected, caipAddress, address]);

  // Save profiles to localStorage whenever updated
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("profiles", JSON.stringify(profiles));
    }
  }, [profiles]);

  // Wallet connect logic
const handleConnect = async (connector: Connector): Promise<void> => {
  try {
    await connect({ connector });

    // Ensure the connector supports `getAddress` and explicitly cast its type
    if ('getAddress' in connector && typeof connector.getAddress === 'function') {
      const newAddress = await connector.getAddress() as string;
      setWalletAddress(newAddress);
    } else {
      throw new Error("Connector does not support getAddress method.");
    }
  } catch (error) {
    console.error("Wallet connection failed:", error);
    alert("Wallet connection failed. Please try again.");
  }
};


  

  // Wallet disconnect logic
  const handleDisconnect = async (): Promise<void> => {
    setWalletAddress(null);
    setAccountIdentifier(null);
    setActiveWallet(null);
    setActiveProfile(null);
    setProfileImage(null);
    try {
      await wagmiDisconnect();
      await appKit.adapter?.connectionControllerClient?.disconnect();
    } catch (error) {
      console.error("Wallet disconnect error:", error);
    }
  };

  // Set the active wallet and its corresponding profile
  const handleSetActiveWallet = (wallet: string) => {
    setActiveWallet(wallet);
    if (profiles[wallet]) {
      setActiveProfile(profiles[wallet]);
      setProfileImage(profiles[wallet].profileImage);
    } else {
      setActiveProfile(null);
      setProfileImage(null);
    }
  };

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider
          value={{
            walletAddress,
            accountIdentifier,
            profiles,
            walletProfiles,
            activeWallet,
            profileImage,
            activeProfile,
            setActiveWallet: handleSetActiveWallet,
            connect: handleConnect,
            disconnect: handleDisconnect,
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
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
