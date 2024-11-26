"use client";

import { motion } from "framer-motion";
import { useAuthContext } from "../../../context/AuthContext";

export default function ConnectPage() {
  const { walletAddress } = useAuthContext();

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
      <div className="mt-8">
        <appkit-button />
      </div>
    </div>
  );
}
