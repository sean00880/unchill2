'use client';
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Connector, useConnect, useDisconnect } from 'wagmi';
import { wagmiAdapter, projectId } from '../lib/config'; // Import wagmiAdapter and projectId
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { createAppKit } from '@reown/appkit';
import { mainnet, base, bsc } from '@reown/appkit/networks';

// Initialize AppKit with the wagmiAdapter and project ID
const appKit = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [mainnet,base, bsc],
  defaultNetwork: mainnet,
  features:{
    analytics:true,
    email:true,
    socials:['google','x','discord']
  }
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

  // Initialize state with localStorage values if available
  const [displayName, setDisplayName] = useState<string>(() => localStorage.getItem('displayName') || '');
  const [username, setUsername] = useState<string>(() => localStorage.getItem('username') || '');
  const [profileImage, setProfileImage] = useState<string | null>(() => localStorage.getItem('profileImage') || null);
  const [isVerified, setIsVerified] = useState<boolean>(() => localStorage.getItem('isVerified') === 'true');

  // Optional: Log or use cookies as needed
  useEffect(() => {
    if (cookies) {
      console.log('Cookies:', cookies);
      // Parse cookies if necessary
    }
  }, [cookies]);

  useEffect(() => {
    localStorage.setItem('displayName', displayName);
  }, [displayName]);

  useEffect(() => {
    localStorage.setItem('username', username);
  }, [username]);

  useEffect(() => {
    if (profileImage) {
      localStorage.setItem('profileImage', profileImage);
    } else {
      localStorage.removeItem('profileImage');
    }
  }, [profileImage]);

  useEffect(() => {
    localStorage.setItem('isVerified', isVerified.toString());
  }, [isVerified]);

  const logout = () => {
    setDisplayName('');
    setUsername('');
    setProfileImage(null);
    setIsVerified(false);
    disconnect();
    localStorage.clear();
  };

  const handleConnect = async (connector: Connector): Promise<void> => {
    try {
      await connect({ connector });
    } catch (error) {
      console.error('Connection failed:', error);
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
            walletAddress: null, // Set as null if not wrapped by WagmiProvider
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
  if (!context) throw new Error('useAuthContext must be used within an AuthProvider');
  return context;
};
