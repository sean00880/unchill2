"use client";

import { useEffect } from "react";
import { supabase } from "../utils/supaBaseClient";
import { useAuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export const useAuthRedirect = () => {
  const { walletAddress, accountIdentifier } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    const checkProfile = async () => {
      if (!walletAddress) {
        router.replace("/auth/connect");
        return;
      }

      try {
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("account_identifier", accountIdentifier)
          .single();

        if (error || !profile) {
          router.replace("/auth/create-profile");
          return;
        }

        router.replace("/auth/overview");
      } catch (err) {
        console.error("Error checking profile:", err);
      }
    };

    checkProfile();
  }, [walletAddress, accountIdentifier, router]);
};
