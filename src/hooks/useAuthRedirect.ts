"use client";

import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export const useAuthRedirect = () => {
  const {
    walletAddress,
    accountIdentifier,
    profiles,
    activeWallet,
    setActiveWallet,
    fetchProfiles, // Ensure fetchProfiles is implemented in AuthContext
  } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    const handleAuthRedirect = async () => {
      // Redirect to connect page if no wallet is connected
      if (!walletAddress) {
        router.replace("/auth/connect");
        return;
      }

      try {
        // Ensure profiles are loaded by fetching them if not already available
        if (profiles.length === 0 && accountIdentifier) {
          console.log("Profiles not loaded, fetching using fetchProfiles...");
          await fetchProfiles(accountIdentifier);
        }

        // Check if the connected wallet has a linked profile
        const linkedProfile = profiles.find(
          (profile) => profile.walletAddress === walletAddress
        );

        if (!linkedProfile) {
          console.log("No linked profile found for wallet, redirecting to create-profile...");
          // Redirect to create-profile if no profile exists for the connected wallet
          router.replace("/auth/create-profile");
          return;
        }

        // Set the active wallet and redirect to overview if a profile exists
        console.log("Linked profile found, setting active wallet and redirecting to overview...");
        setActiveWallet(walletAddress);
        router.replace("/auth/overview");
      } catch (error) {
        console.error("Error during authentication redirect:", error);
        // Redirect to connect as a fallback
        router.replace("/auth/connect");
      }
    };

    handleAuthRedirect();
  }, [
    walletAddress,
    accountIdentifier,
    profiles,
    activeWallet,
    fetchProfiles,
    setActiveWallet,
    router,
  ]);
};
