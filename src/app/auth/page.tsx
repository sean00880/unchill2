"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../../context/AuthContext";

export default function AuthPage() {
  const { walletAddress, activeProfile } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!walletAddress) {
      router.replace("/auth/connect"); // Redirect to wallet connect if no wallet
    } else if (!activeProfile) {
      router.replace("/auth/create-profile"); // Redirect to profile creation if no profile
    } else {
      router.replace("/auth/overview"); // Redirect to overview if wallet and profile are set
    }
  }, [walletAddress, activeProfile, router]);

  return (
    <div className="text-center text-white min-h-screen flex items-center justify-center">
      <p>Redirecting...</p>
    </div>
  );
}
