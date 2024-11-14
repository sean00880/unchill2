// src/components/AuthForm.tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ProgressBar from "./ProgressBar";

export default function AuthForm({ isDarkMode }: { isDarkMode: boolean }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [membershipTier, setMembershipTier] = useState("basic");
  const [role, setRole] = useState("Normie");
  const [profile, setProfile] = useState("Normie");
  const totalSteps = 3;

  const membershipLabels = ["NORMIE", "WORKIE", "TRADIE", "GROWIE", "VIP"];
  const membershipPrices = ["Free", "$50/month", "$100/month", "$200/month", "Custom (Talk to Sales)"];


  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const containerStyle = `
    ${isDarkMode ? "bg-[#090909]/80" : "bg-white/80"} 
    backdrop-blur-md border rounded-lg p-6 shadow-lg
  `;

  // Step 1: Sign Up or Connect
  const Step1 = () => (
    <motion.div
     
    >
      <motion.button
        onClick={nextStep}
        className={`gradient-button w-full `}
      >
        <Image src="/images/wallet-icon.png" alt="Wallet" width={30} height={30} className="mr-3" />
        <span className="font-semibold">Connect with Wallet</span>
      </motion.button>

      <div className="text-center my-4">or</div>

      <motion.button
        onClick={nextStep}
        className={`gradient-button w-full`}
      >
        <Image src="/images/google-icon.png" alt="Google" width={30} height={30} className="mr-3" />
        <span className="font-semibold">Continue with Google</span>
      </motion.button>
    </motion.div>
  );

  // Step 2: Select Membership Tier
 // Step 2: Select Membership Tier with Buttons
// Step 2: Static Pricing Table with Select Buttons
const Step2 = () => {
  return (
    <div
    
    >
      <span>Choose Your Growth Level:</span>

      <div className="overflow-x-auto mt-2">
        <table className="w-full text-left border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="px-1"><em>Feature</em></th>
              <th className="px-1 text-center"><em>Basic</em></th>
              <th className="px-1 text-center"><em>Premium</em></th>
              <th className="px-1 text-center"><em>VIP</em></th>
            </tr>
          </thead>
          <tbody className="membersTable">
            <tr>
              <td>Basic Profile Listings</td>
              <td className="text-center">✅</td>
              <td className="text-center">✅</td>
              <td className="text-center">✅</td>
            </tr>
            <tr>
              <td>Basic GROWSZ Features</td>
              <td className="text-center">❌</td>
              <td className="text-center">✅</td>
              <td className="text-center">✅</td>
            </tr>
            <tr>
              <td>Enhanced Dex Listings</td>
              <td className="text-center">❌</td>
              <td className="text-center">✅</td>
              <td className="text-center">✅</td>
            </tr>
            <tr>
              <td>Host Competitions</td>
              <td className="text-center">❌</td>
              <td className="text-center">❌</td>
              <td className="text-center">✅</td>
            </tr>
            <tr>
              <td>Custom Development Solutions</td>
              <td className="text-center">❌</td>
              <td className="text-center">❌</td>
              <td className="text-center">✅</td>
            </tr>
            <tr>
            <td>Custom Development Solutions</td>
            <td>
              
                <button className="w-full border rounded-md bg-[#090909] text-white hover:bg-green-600 transition">
                  Select Basic
                </button>
          
              
              </td>
              <td>
              <button className="w-full border rounded-md bg-[#090909] text-white hover:bg-green-600 transition">
                  Select Premium
                </button>
               
              </td>
              <td>
              <button className="w-full border rounded-md bg-[#090909] text-white hover:bg-green-600 transition">
                  Select VIP
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex space-x-4 mt-6">
        <button onClick={prevStep} className="p-2 border rounded-md hover:bg-gray-100 hover:text-green-700 transition">
          Back
        </button>
        <button onClick={nextStep} className="gradient-button p-2 rounded-md">
          Continue
        </button>
      </div>
    </div>
  );
};



  // Step 3: Profile Setup
  const Step3 = () => (
    <div className="space-y-4">
      <h3 className={`text-xl font-bold`}>Profile Setup</h3>
      <p className="text-sm">
        Customize your profile based on the selected membership tier.
      </p>

      <label className="block">Membership Tier</label>
      <select
        className="w-full p-2 border rounded-md bg-transparent"
        value={membershipTier}
        onChange={(e) => setMembershipTier(e.target.value)}
      >
        <option value="basic">Basic (Free for a limited time)</option>
        <option value="verified">Verified (Paid) | Recommended for Maximum Exposure</option>
      </select>

      <label className="block mt-4">Profile</label>
      <select
        className="w-full p-2 border rounded-md bg-transparent"
        value={profile}
        onChange={(e) => setProfile(e.target.value)}
      >
        {["Crypto Project", "Individual", "Group"].map((profileOption) => (
          <option key={profileOption} value={profileOption}>
            {profileOption}
          </option>
        ))}
      </select>

      <label className="block mt-4">Role</label>
      <select
        className="w-full p-2 border rounded-md bg-transparent"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        {[
          "Crypto Community",
          "Influencer",
          "Trader",
          "Shiller",
          "Developer",
          "KOL Group",
          "NFT Community",
          "Normie",
        ].map((roleOption) => (
          <option key={roleOption} value={roleOption}>
            {roleOption}
          </option>
        ))}
      </select>

      <label className="block mt-4">About/Introduction</label>
      <textarea
        placeholder="Tell us about yourself or your project..."
        className="w-full p-2 border rounded-md bg-transparent"
      />

      <label className="block mt-4">Optional: Upload Profile Picture</label>
      <input type="file" className="w-full" />

      <div className="flex space-x-4 mt-6">
        <button onClick={prevStep} className="p-2 border rounded-md hover:bg-gray-100 hover:text-green-700 transition">
          Back
        </button>
        <button onClick={nextStep} className="gradient-button p-2 rounded-md">
          Continue
        </button>
      </div>
    </div>
  );

  // Dynamic preview content for Membership Tier selection (Step 2) and Profile Setup (Step 3)
  const getPreviewContent = () => {
    if (currentStep === 2) {
      return membershipTier === "basic"
        ? "Basic Membership: Access to GROWSZ's core features for free."
        : "Verified Membership: Enjoy additional exposure and exclusive tools on the GROWSZ platform.";
    } else if (currentStep === 3) {
      switch (role) {
        case "Crypto Community":
          return "Crypto communities get access to forums, chat rooms, and exclusive project insights.";
        case "Influencer":
          return "Influencers have access to advanced analytics and exclusive partnership opportunities.";
        case "Trader":
          return "Traders can view live charts and trading analytics tailored to crypto markets.";
        case "Shiller":
          return "Shillers have custom promotional tools to share projects across platforms.";
        case "Developer":
          return "Developers can access API integrations and development tools for project building.";
        case "NFT Community":
          return "NFT communities can manage assets and engage with other collectors and traders.";
        case "Normie":
          return "LOL, welcome to the crypto world.";
        default:
          return "Choose a role to see a customized preview of what you'll get access to!";
      }
    }
    return "";
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left Column: Form */}
      <div 
          className={`${containerStyle} project-box`}>
        
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={` text-center mb-8 `}
        >
          {currentStep === 1 ? "Sign Up" : currentStep === 2 ? "Choose Membership Tier" : "Profile Setup"}
        </motion.h2>

        {currentStep === 1 && <Step1 />}
        {currentStep === 2 && <Step2 />}
        {currentStep === 3 && <Step3 />}
      </div>

      {/* Right Column: Dynamic Preview */}
      <div className={`${containerStyle} p-6 project-box`}>
        <h3 className=" font-bold mb-4">Preview</h3>
        <div className=" leading-relaxed text-gray-300">
          {getPreviewContent()}
        </div>
      </div>
    </div>
  );
}
