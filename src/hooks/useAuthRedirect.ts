"use client";

import { useEffect } from "react";
import { supabase } from "src/utils/supaBaseClient";
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
        // Fetch profiles from Supabase
        const { data: fetchedProfiles, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("account_identifier", accountIdentifier);

        if (error) {
          console.error("Error fetching profiles from Supabase:", error);
          router.replace("/auth/connect"); // Safe fallback
          return;
        }

        // Ensure fetchedProfiles is not null and is an array
        const profilesArray = fetchedProfiles || [];

        // Dynamically fetch profiles using fetchProfiles if not already loaded
        if (profilesArray.length === 0 && accountIdentifier) {
          await fetchProfiles(accountIdentifier);
        }

        // Check if the connected wallet has a linked profile
        const linkedProfile = profilesArray.find(
          (profile) => profile.walletAddress === walletAddress
        );

        if (!linkedProfile) {
          // Redirect to create-profile if no profile exists for the connected wallet
          router.replace("/auth/create-profile");
          return;
        }

        // Set the active wallet and redirect to overview if a profile exists
        setActiveWallet(walletAddress);
        router.replace("/auth/overview");
      } catch (error) {
        console.error("Error during authentication redirect:", error);
        router.replace("/auth/connect"); // Safe fallback
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
