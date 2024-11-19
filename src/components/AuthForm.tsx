// src/components/AuthForm.tsx
"use client";
import { useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ProgressBar from "./ProgressBar";

export default function AuthForm({ isDarkMode }: { isDarkMode: boolean }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [membershipTier, setMembershipTier] = useState("basic");
  const [role, setRole] = useState("Normie");
  const [profile, setProfile] = useState("Normie");
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const totalSteps = 3;

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const containerStyle = `
    ${isDarkMode ? "bg-[#090909]/80" : "bg-white/80"} 
    backdrop-blur-md border rounded-lg p-6 shadow-lg
  `;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = useCallback(
    (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setter(e.target.value);
    },
    []
  );

  const renderMembershipComparison = () => (
    <div className="mt-8">
      <h3 className="font-bold text-lg mb-4">Membership Comparison</h3>
      <table className="w-full text-left border-collapse border border-gray-500">
        <thead>
          <tr>
            <th className="border border-gray-500 p-2">Feature</th>
            <th className="border border-gray-500 p-2">Basic</th>
            <th className="border border-gray-500 p-2">Verified</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-500 p-2">Access to platform</td>
            <td className="border border-gray-500 p-2">Limited</td>
            <td className="border border-gray-500 p-2">Full</td>
          </tr>
          <tr>
            <td className="border border-gray-500 p-2">Profile visibility</td>
            <td className="border border-gray-500 p-2">Standard</td>
            <td className="border border-gray-500 p-2">High</td>
          </tr>
          <tr>
            <td className="border border-gray-500 p-2">Support level</td>
            <td className="border border-gray-500 p-2">Basic</td>
            <td className="border border-gray-500 p-2">Priority</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="flex flex-col w-full h-screen relative">
      {/* Fixed Progress Bar at the Top */}
      <div className="w-full sticky top-0 z-10 bg-transparent">
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      </div>

      {/* Main Content Container */}
      <div className="flex flex-1 flex-col md:flex-row justify-center items-center md:items-stretch">
        {/* Left Column: Form */}
        <div className="flex-1 w-full md:w-1/2 p-4 md:p-6 flex justify-center items-center">
          <div className={`${containerStyle} w-full`}>
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              {currentStep === 1 ? "Sign Up" : currentStep === 2 ? "Create Your Profile" : "Profile Setup"}
            </motion.h2>

            {currentStep === 1 && (
              <motion.div className="flex flex-col items-center justify-center">
                <motion.button onClick={nextStep} className="gradient-button w-full mb-4">
                  <Image src="/images/wallet-icon.png" alt="Wallet" width={30} height={30} className="mr-3" />
                  <span className="font-semibold">Connect with Wallet</span>
                </motion.button>
                <div className="text-center my-4">or</div>
                <motion.button onClick={nextStep} className="gradient-button w-full">
                  <Image src="/images/google-icon.png" alt="Google" width={30} height={30} className="mr-3" />
                  <span className="font-semibold">Continue with Google</span>
                </motion.button>
              </motion.div>
            )}

            {currentStep === 2 && (
              <form>
                <span>Create Your Profile:</span>
                <div className="mt-2 space-y-4">
                  <label className="block">Display Name</label>
                  <input
                    type="text"
                    placeholder="Enter your display name..."
                    className="w-full p-2 border rounded-md bg-transparent"
                    value={displayName}
                    onChange={handleChange(setDisplayName)}
                  />
                  <label className="block mt-4">Username</label>
                  <input
                    type="text"
                    placeholder="Enter your username..."
                    className="w-full p-2 border rounded-md bg-transparent"
                    value={username}
                    onChange={handleChange(setUsername)}
                  />
                  <label className="block mt-4">About/Introduction</label>
                  <textarea
                    placeholder="Tell us about yourself or your role..."
                    className="w-full p-2 border rounded-md bg-transparent"
                    value={about}
                    onChange={handleChange(setAbout)}
                  />
                  {/* Upload Profile Picture for larger screens */}
                  {currentStep === 2 && (
                    <div className="block md:hidden mt-4">
                      <label className="block">Upload Profile Picture</label>
                      <input type="file" className="w-full" onChange={handleImageUpload} />
                    </div>
                  )}
                </div>
              </form>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Profile Setup</h3>
                <p className="text-sm">Customize your profile based on the selected membership tier.</p>
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
                <textarea placeholder="Tell us about yourself or your project..." className="w-full p-2 border rounded-md bg-transparent" />
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Dynamic Preview */}
        {(currentStep === 2 || currentStep === 3) && (
          <div className="w-full md:w-1/2 h-auto p-4 md:sticky md:top-[10vh] flex flex-col items-center justify-center">
            <div className={`${containerStyle} w-full`}>
              <h3 className="font-bold mb-4">Preview</h3>
              <div className="leading-relaxed text-gray-300">
                <div className="flex flex-col items-center space-y-4">
                  {/* Profile Picture Preview */}
                  <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300">
                    {profilePicture ? (
                      <Image src={profilePicture} alt="Profile Preview" width={96} height={96} />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-gray-200">
                        <span>Placeholder</span>
                      </div>
                    )}
                  </div>
                  {/* Display Name */}
                  <div>
                    <h3 className="font-bold">Display Name:</h3>
                    <p>{displayName || "Your display name will appear here."}</p>
                  </div>
                  {/* Username */}
                  <div>
                    <h3 className="font-bold">Username:</h3>
                    <p>@{username || "username"}</p>
                  </div>
                  {/* About */}
                  <div>
                    <h3 className="font-bold">About:</h3>
                    <p>{about || "Your introduction will appear here."}</p>
                  </div>
                  {/* Upload Profile Picture for larger screens */}
                  {currentStep === 2 && (
                    <div className="hidden md:block mt-4">
                      <label className="block">Upload Profile Picture</label>
                      <input type="file" className="w-full" onChange={handleImageUpload} />
                    </div>
                  )}
                </div>
                {currentStep === 3 && renderMembershipComparison()}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fixed Navigation Buttons */}
      <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 flex space-x-4">
        {currentStep > 1 && (
          <button onClick={prevStep} className="p-2 border rounded-md hover:bg-gray-100 hover:text-yellow-700 transition">
            Back
          </button>
        )}
        {currentStep < totalSteps && (
          <button onClick={nextStep} className="gradient-button p-2 rounded-md">
            Continue
          </button>
        )}
      </div>
    </div>
  );
}
