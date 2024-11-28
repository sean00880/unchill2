"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode, useRef } from "react";
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

// Profile Interface
export interface Profile {
  id: string;
  displayName: string;
  username: string;
  about: string;
  profileImageUrl: string | null;
  bannerImageUrl: string | null;
  membershipTier: string;
  profileType: string;
  role: string;
  walletAddress: string;
  accountIdentifier: string; // Updated to store only chainId
  blockchainWallet: string; // New field: chainId + walletAddress
  email?: string;
  password?: string;
  shortId?: string;
  linked?: string[];
  links?: string[];
}

// AuthContext Type
export interface AuthContextType {
  username: string | null;
  walletAddress: string | null;
  accountIdentifier: string | null;
  blockchainWallet: string | null; // New state for legacy data
  profiles: Profile[];
  activeWallet: string | null;
  activeProfile: Profile | null; 
  setActiveWallet: (walletAddress: string) => void; // Internal use
  switchProfile: (walletAddress: string) => void; // User-facing function
  connect: (connector: Connector) => Promise<void>;
  disconnect: () => Promise<void>;
  connectors: readonly Connector[];
  fetchProfiles: (accountIdentifier: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
  cookies?: { walletAddress: string | null; accountIdentifier: string | null };
};

export const AuthProvider = ({ children, cookies }: AuthProviderProps) => {
  const { disconnect: wagmiDisconnect } = useDisconnect();
  const { connect, connectors } = useConnect();
  const { address, isConnected, caipAddress, status } = useAppKitAccount();

  const [username, setUsername] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(cookies?.walletAddress || null);
  const [accountIdentifier, setAccountIdentifier] = useState<string | null>(cookies?.accountIdentifier || null);
  const [blockchainWallet, setBlockchainWallet] = useState<string | null>(null); // New state
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [activeWallet, setActiveWallet] = useState<string | null>(null);
  const [activeProfile, setActiveProfile] = useState<Profile | null>(null);

  // Profile Cache to Avoid Redundant API Calls
  const profileCache = useRef<Map<string, Profile[]>>(new Map());

  
  const switchProfile = (wallet: string) => {
    if (!profiles.some((p) => p.walletAddress === wallet)) {
      console.error("Cannot switch to a non-existent profile:", wallet);
      return;
    }
    console.log("Switching profile to wallet:", wallet);
    setActiveWallet(wallet);
  };
  

  // Log State Changes
  useEffect(() => {
    console.log("AuthProvider State Updated:", {
      username,
      walletAddress,
      accountIdentifier,
      blockchainWallet,
      profiles,
      activeWallet,
      activeProfile,
    });
  }, [username, walletAddress, accountIdentifier, blockchainWallet, profiles, activeWallet, activeProfile]);

  // Fetch Profiles for the Account Identifier (chainId)
  const fetchProfiles = async (identifier: string) => {
    try {
      if (profileCache.current.has(identifier)) {
        console.log("Using cached profiles for identifier:", identifier);
        setProfiles(profileCache.current.get(identifier)!);
        return;
      }
  
      const { data, error } = await supabase
        .from("profiles")
        .select(
          "id, display_name, username, about, profile_image_url, banner_image_url, membership_tier, profile_type, role, wallet_address, account_identifier, blockchain_wallet, email, password, short_id, linked, links"
        )
        .eq("account_identifier", identifier);
  
      if (error) throw new Error(error.message);
  
      const formattedData = (data || []).map(profile => ({
        id: profile.id,
        displayName: profile.display_name,
        username: profile.username,
        about: profile.about,
        profileImageUrl: profile.profile_image_url,
        bannerImageUrl: profile.banner_image_url,
        membershipTier: profile.membership_tier,
        profileType: profile.profile_type,
        role: profile.role,
        walletAddress: profile.wallet_address,
        accountIdentifier: profile.account_identifier,
        blockchainWallet: profile.blockchain_wallet,
        email: profile.email,
        password: profile.password,
        shortId: profile.short_id,
        linked: profile.linked,
        links: profile.links,
      }));
  
      profileCache.current.set(identifier, formattedData);
      setProfiles(formattedData);
      setUsername(formattedData[0]?.username || null);
    } catch (error) {
      console.error("Error fetching profiles:", error);
      setProfiles([]);
      setUsername(null);
    }
  };
  

  // Automatically Sync Wallet Connection
  useEffect(() => {
    console.log("Wallet connection status changed:", { isConnected, address, caipAddress, status });
  
    if (isConnected && address) {
      const chainId = caipAddress?.split(":")[1] || null; // Extract chainId
      setWalletAddress(address);
      setAccountIdentifier(chainId); // Store chainId only
      setBlockchainWallet(caipAddress || `${chainId}:${address}`); // Store legacy identifier
      if (chainId) fetchProfiles(chainId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, address, caipAddress]);
  

  // Set Active Wallet and Profile

  // Wallet Connection Logic
  const handleConnect = async (connector: Connector & { getAddress?: () => Promise<string> }) => {
    try {
      console.log("Attempting to connect wallet with connector:", connector);
      await connect({ connector });
      const newAddress = connector.getAddress ? await connector.getAddress() : address;
      if (newAddress) {
        console.log("Wallet connected with address:", newAddress);
        setWalletAddress(newAddress);
        setAccountIdentifier(newAddress);
        fetchProfiles(newAddress);
      }
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

  // Wallet Disconnection Logic
  const handleDisconnect = async () => {
    console.log("Disconnecting wallet...");
    setWalletAddress(null);
    setAccountIdentifier(null);
    setBlockchainWallet(null);
    setActiveWallet(null);
    setActiveProfile(null);
    setProfiles([]);
    profileCache.current.clear();
    await wagmiDisconnect();
  };

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider
          value={{
            walletAddress,
            accountIdentifier,
            blockchainWallet,
            profiles,
            activeWallet,
            activeProfile,
            setActiveWallet,
            switchProfile, // Expose as user-facing
            connect: handleConnect,
            disconnect: handleDisconnect,
            connectors,
            username,
            fetchProfiles,
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
