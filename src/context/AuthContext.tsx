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

// Add `Profile` export in AuthContext.tsx
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
  accountIdentifier: string;
  email?: string; // Optional
  password?: string; // Optional
  shortId?: string; // Optional
  linked?: string[]; // Optional
  links?: string[]; // Optional
}

export interface AuthContextType {
  username: string | null;
  walletAddress: string | null;
  accountIdentifier: string | null;
  profiles: Profile[];
  activeWallet: string | null;
  activeProfile: Profile | null;
  setActiveWallet: (walletAddress: string) => void;
  connect: (connector: Connector) => Promise<void>;
  disconnect: () => Promise<void>;
  connectors: readonly Connector[];
  fetchProfiles: (accountIdentifier: string) => Promise<void>; // Add fetchProfiles
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
  cookies?: string | null;
};

export const AuthProvider = ({ children, cookies }: AuthProviderProps) => {
  const { disconnect: wagmiDisconnect } = useDisconnect();
  const { connect, connectors } = useConnect();
  const { address, isConnected, caipAddress } = useAppKitAccount();

  // Initialize states with cookies fallback
  const [username, setUsername] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(cookies || null); // Use cookies as initial state
  const [accountIdentifier, setAccountIdentifier] = useState<string | null>(cookies || null);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [activeWallet, setActiveWallet] = useState<string | null>(null);
  const [activeProfile, setActiveProfile] = useState<Profile | null>(null);

  // Fetch profiles for the accountIdentifier
  const fetchProfiles = async (identifier: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select(
        "id, display_name, username, about, profile_image_url, banner_image_url, membership_tier, profile_type, role, wallet_address, account_identifier, email, password, short_id, linked, links"
      )
      .eq("account_identifier", identifier);

    if (!error && data) {
      const formattedData: Profile[] = data.map((profile) => ({
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
        email: profile.email,
        password: profile.password,
        shortId: profile.short_id,
        linked: profile.linked,
        links: profile.links,
      }));
      setProfiles(formattedData);

      // Set the username if profiles are available
      if (formattedData.length > 0) {
        setUsername(formattedData[0].username);
      } else {
        setUsername(null);
      }
    } else {
      console.error("Error fetching profiles:", error);
      setProfiles([]);
      setUsername(null);
    }
  };

  // Automatically sync wallet connection
  useEffect(() => {
    if (isConnected && address) {
      setWalletAddress(address);
    }
  }, [isConnected, address]);

  // Use cookies to fetch profiles if available
  useEffect(() => {
    if (cookies && !isConnected) {
      console.log("Using cookies for initial setup:", cookies);
      setAccountIdentifier(cookies);
      fetchProfiles(cookies);
    }
  }, [cookies, isConnected]);

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
  const handleConnect = async (connector: Connector & { getAddress?: () => Promise<string> }) => {
    try {
      await connect({ connector });

      if (connector.getAddress) {
        const newAddress = await connector.getAddress();
        setWalletAddress(newAddress);
      } else {
        console.warn("Connector does not support getAddress.");
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
            username, // Add this line
            fetchProfiles, // Provide fetchProfiles
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
