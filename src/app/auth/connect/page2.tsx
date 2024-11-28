"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuthContext } from "../../../context/AuthContext";
import { useAppKit } from "@reown/appkit/react";
import { Profile } from "../../../context/AuthContext";

// Define the shape of Debug Data
interface DebugData {
  accountIdentifier: string | null;
  walletAddress: string | null;
  profiles: Profile[];
  activeWallet: string | null;
  activeProfile: Profile | null;
}

export default function ConnectPage() {
  const {
    walletAddress,
    activeProfile,
    accountIdentifier,
    profiles,
    activeWallet, // Include activeWallet from the context
    setActiveWallet,
    fetchProfiles,
  } = useAuthContext();

  const { open } = useAppKit(); // Access the AppKit open function for debugging
  const [debugData, setDebugData] = useState<DebugData | null>(null); // State to store debug data

  // Automatically fetch profiles after wallet connection
  useEffect(() => {
    if (accountIdentifier) {
      console.log("Fetching profiles for account identifier:", accountIdentifier);
      fetchProfiles(accountIdentifier);
    }
  }, [accountIdentifier, fetchProfiles]);

  // Inspect wallet data with the open({ view: 'Account' }) function
  const inspectWalletData = async () => {
    try {
      console.log("Opening Account view for inspection...");
      open({ view: "Account" }); // Open the wallet modal's Account view

      // Simulate logging available data for debugging
      const mockWalletData: DebugData = {
        accountIdentifier,
        walletAddress,
        profiles,
        activeWallet, // Include activeWallet here
        activeProfile,
      };
      setDebugData(mockWalletData); // Save debug data to state for analysis
      console.log("Debug data collected:", mockWalletData);
    } catch (error) {
      console.error("Error inspecting wallet data:", error);
    }
  };

  useEffect(() => {
    // Log current state for debugging
    console.log("ConnectPage State Updated:", {
      walletAddress,
      accountIdentifier,
      profiles,
      activeWallet,
      activeProfile,
    });
  }, [walletAddress, accountIdentifier, profiles, activeWallet, activeProfile]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-xl font-bold"
      >
        Connect Your Wallet
      </motion.h2>

      {/* Wallet Connect Button */}
      <div className="mt-8 flex flex-col space-y-4">
        <w3m-button />
        <button
          onClick={inspectWalletData}
          className="p-2 mt-4 border rounded-md bg-green-500 text-white"
        >
          Inspect Wallet Data
        </button>
      </div>

      {/* Debug Data Display */}
      {debugData && (
        <div className="mt-6 bg-gray-200 p-4 rounded-md shadow-lg">
          <h3 className="text-lg font-medium">Debug Data:</h3>
          <pre className="text-sm text-gray-800">{JSON.stringify(debugData, null, 2)}</pre>
        </div>
      )}

      {/* Status of Current Connection */}
      {walletAddress && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-8 bg-gray-100 p-4 rounded-md shadow-lg"
        >
          <h3 className="text-lg font-medium">Wallet Connected</h3>
          <p className="text-sm">Address: {walletAddress}</p>
          <p className="text-sm">Account Identifier: {accountIdentifier}</p>

          {/* Show Profiles */}
          {profiles.length > 0 ? (
            <div className="mt-4">
              <h4 className="text-md font-medium">Linked Profiles:</h4>
              <ul className="mt-2 space-y-2">
                {profiles.map((profile) => (
                  <li
                    key={profile.id}
                    className={`p-2 border rounded-md ${
                      activeProfile?.walletAddress === profile.walletAddress
                        ? "border-blue-500 bg-blue-100"
                        : "border-gray-300"
                    }`}
                    onClick={() => {
                      console.log("Switching to profile for wallet:", profile.walletAddress);
                      setActiveWallet(profile.walletAddress);
                    }}
                  >
                    <p className="font-medium">
                      {profile.displayName || profile.username}
                    </p>
                    <p className="text-sm text-gray-500">
                      Wallet: {profile.walletAddress}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="mt-4 text-sm text-gray-500">
              No linked profiles found for this wallet.
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
}
