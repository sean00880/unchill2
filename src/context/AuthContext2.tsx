"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { Connector, useConnect, useDisconnect } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { wagmiAdapter, projectId } from "../lib/config";
import { WagmiProvider } from "wagmi";
import { createAppKit } from "@reown/appkit";
import { mainnet, base, bsc } from "@reown/appkit/networks";
import { useAppKitAccount } from "@reown/appkit/react";
import { supabase } from "../utils/supaBaseClient";

// Initialize AppKit
export const appKit = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [mainnet, base, bsc],
  defaultNetwork: mainnet,
});

const queryClient = new QueryClient();

interface Profile {
  id: string;
  displayName: string;
  username: string;
  profileImage: string | null;
  walletAddress: string;
}

interface AuthContextType {
  walletAddress: string | null;
  accountIdentifier: string | null;
  profiles: Profile[];
  activeWallet: string | null;
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
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [activeWallet, setActiveWallet] = useState<string | null>(null);
  const [activeProfile, setActiveProfile] = useState<Profile | null>(null);

  // Fetch profiles for the accountIdentifier
  const fetchProfiles = async (identifier: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("account_identifier", identifier);

    if (!error && data) {
      setProfiles(data);
    } else {
      setProfiles([]);
      console.error("Error fetching profiles:", error);
    }
  };

  // Automatically sync wallet connection
  useEffect(() => {
    if (isConnected && address) {
      setWalletAddress(address);
    }
  }, [isConnected, address]);

  // Fetch profiles and set active profile when accountIdentifier changes
  useEffect(() => {
    if (isConnected && caipAddress) {
      setAccountIdentifier(caipAddress);
      fetchProfiles(caipAddress);
    }
  }, [isConnected, caipAddress]);

  // Set the active wallet and its corresponding profile
  const handleSetActiveWallet = (wallet: string) => {
    setActiveWallet(wallet);
    const profile = profiles.find((p) => p.walletAddress === wallet);
    setActiveProfile(profile || null);
  };

  // Wallet connection logic
  const handleConnect = async (connector: Connector) => {
    try {
      await connect({ connector });
      const newAddress = connector.getAddress?.();
      if (newAddress) {
        setWalletAddress(newAddress);
      }
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

  // Wallet disconnection logic
  const handleDisconnect = async () => {
    setWalletAddress(null);
    setAccountIdentifier(null);
    setActiveWallet(null);
    setActiveProfile(null);
    setProfiles([]);
    await wagmiDisconnect();
  };

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider
          value={{
            walletAddress,
            accountIdentifier,
            profiles,
            activeWallet,
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
