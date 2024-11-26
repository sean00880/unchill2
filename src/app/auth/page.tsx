"use client"; // Ensure client-side execution

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../../context/AuthContext";

export default function AuthPage() {
  const { accountIdentifier } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!accountIdentifier) {
      router.push("/auth/connect");
    } else {
      router.push("/auth/overview");
    }
  }, [accountIdentifier, router]);

  return (
    <div className="text-center text-white min-h-screen flex items-center justify-center">
      <p>Redirecting...</p>
    </div>
  );
}
