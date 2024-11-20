"use client";
import { useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ProgressBar from "./ProgressBar";
import { supabase } from "../utils/supaBaseClient"; // Import Supabase client
import AlertModal from "./AlertModal"; // Import the custom alert component

interface ProfileData {
  display_name: string;
  username: string;
  about: string;
  role: string;
  profile_type: string;
  membership_tier: string;
  profile_image_url: string | null;
  banner_image_url: string | null;
  email?: string;
  password?: string;
  google_id?: string;
  wallet_address?: string;
}

export default function AuthForm({ isDarkMode }: { isDarkMode: boolean }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [signupOption, setSignupOption] = useState<"wallet" | "google" | "email">("wallet");
  const [membershipTier, setMembershipTier] = useState("basic");
  const [role, setRole] = useState("Normie");
  const [profile, setProfile] = useState("Normie");
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [about, setAbout] = useState("");
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const totalSteps = 3;

  const nextStep = () => {
    if (currentStep === 2 && (!displayName || !username)) {
      setAlertMessage("Display Name and Username are required.");
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleCloseAlert = () => {
    setAlertMessage(null);
  };

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = useCallback(
    (setter: React.Dispatch<React.SetStateAction<string>>) => (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setter(e.target.value);
    },
    []
  );

  const containerStyle = `
    ${isDarkMode ? "" : "bg-white/80"} 
    backdrop-blur-md border rounded-lg p-6 shadow-lg
  `;

  const customUploadButtonStyle = `
    py-2 px-4 mt-2 bg-white/20 border border-white/30 rounded-lg
    shadow-xl backdrop-blur-md hover:bg-white/30 transition-all duration-300
    cursor-pointer transform hover:scale-105 text
  `;

  const handleSubmit = async () => {
    if (!displayName || !username) {
      setAlertMessage("Display Name and Username are required.");
      return;
    }

    setLoading(true);
    try {
      const profileData: ProfileData = {
        display_name: displayName,
        username: username,
        about: about,
        role: role,
        profile_type: profile,
        membership_tier: membershipTier,
        profile_image_url: profilePicture,
        banner_image_url: bannerImage,
      };

      // Add different identifiers based on the selected signup option
      if (signupOption === "wallet") {
        profileData.wallet_address = "user-wallet-address"; // Replace with actual wallet address when integrating
      } else if (signupOption === "google") {
        profileData.google_id = "user-google-id"; // Replace with actual Google ID when integrating
      }

      // Include optional email and password fields
      if (signupOption === "email" || email || password) {
        profileData.email = email;
        profileData.password = password; // Ensure passwords are hashed before storing in production
      }

      const { data, error } = await supabase.from("profiles").insert([profileData]);
      if (error) {
        console.error("Error inserting profile:", error.message);
        setAlertMessage("Error: " + error.message);
      } else {
        console.log("Profile inserted successfully:", data);
        setAlertMessage("Profile created successfully!");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setAlertMessage("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      {alertMessage && <AlertModal message={alertMessage} onClose={handleCloseAlert} />}
      <div className="w-full sticky top-0 z-10 bg-transparent">
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      </div>

      {/* Main Content Container */}
      <div className="flex flex-1 flex-col md:flex-row justify-center items-stretch">
        {/* Left Column: Form */}
        <div className="flex-1 w-full md:w-1/2 p-4 md:p-6 flex justify-center items-center relative">
          <div className={`${containerStyle} w-full flex flex-col`}>
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              {currentStep === 1 ? "Sign Up" : currentStep === 2 ? "Create Your Profile" : "Profile Setup"}
            </motion.h2>

            {currentStep === 1 && (
              <motion.div className="flex flex-col w-[50%] self-center items-center justify-center">
                <motion.button
                  onClick={() => {
                    setSignupOption("wallet");
                    nextStep();
                  }}
                  className="gradient-button w-full items-center flex flex-col mb-4"
                >
                  <Image src="/images/wallet.png" alt="Wallet" width={30} height={30} className="mr-3" />
                  <span className="font-semibold">Connect with Wallet</span>
                </motion.button>
                <div className="text-center my-4">or</div>
                <motion.button
                  onClick={() => {
                    setSignupOption("google");
                    nextStep();
                  }}
                  className="gradient-button w-full items-center flex flex-col mb-4"
                >
                  <Image src="/images/google-icon.svg" alt="Google" width={30} height={30} className="mr-3" />
                  <span className="font-semibold">Continue with Google</span>
                </motion.button>
                <div className="text-center my-4">or</div>
                <motion.button
                  onClick={() => {
                    setSignupOption("email");
                    nextStep();
                  }}
                  className="gradient-button w-full items-center flex flex-col mb-4"
                >
                  <span className="font-semibold">Sign up with Email</span>
                </motion.button>
              </motion.div>
            )}

            {currentStep === 2 && (
              <form>
                <h6 className="absolute top-2 right-2 text-sm">
                  <span className="text-[red]"> * </span>
                  <span className="text-sm text italic">= Required Fields</span>
                </h6>
                <span>Create Your Profile:</span>
                <div className="mt-2 space-y-4">
                  <label className="block">
                    Display Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your display name..."
                    className="text w-full p-2 border rounded-md bg-transparent"
                    value={displayName}
                    onChange={handleChange(setDisplayName)}
                    required
                  />
                  <label className="block mt-4">
                    Username <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your username..."
                    className="text w-full p-2 border rounded-md bg-transparent"
                    value={username}
                    onChange={handleChange(setUsername)}
                    required
                  />
                  {signupOption !== "email" && (
                    <p className="text-gray-500 text-xs">
                      Optional | You may use {signupOption === "wallet" ? "Wallet" : "Google"} to login
                    </p>
                  )}
                  {(signupOption === "email" || signupOption !== "email") && (
                    <>
                      <label className="block mt-4">
                        Email <span className="text-gray-500">(Optional)</span>
                      </label>
                      <input
                        type="email"
                        placeholder="Enter your email..."
                        className="text w-full p-2 border rounded-md bg-transparent"
                        value={email}
                        onChange={handleChange(setEmail)}
                      />
                      <label className="block mt-4">
                        Password <span className="text-gray-500">(Optional)</span>
                      </label>
                      <input
                        type="password"
                        placeholder="Enter your password..."
                        className="text w-full p-2 border rounded-md bg-transparent"
                        value={password}
                        onChange={handleChange(setPassword)}
                      />
                    </>
                  )}
                  <label className="block mt-4">About/Introduction</label>
                  <textarea
                    placeholder="Tell us about yourself or your role..."
                    className="text w-full p-2 border rounded-md bg-transparent"
                    value={about}
                    onChange={handleChange(setAbout)}
                  />
                </div>
              </form>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Profile Setup</h3>
                <p className="text-sm text">Choose your membership tier:</p>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center text">
                    <input
                      type="radio"
                      name="membershipTier"
                      value="basic"
                      checked={membershipTier === "basic"}
                      onChange={() => setMembershipTier("basic")}
                      className="text mr-2"
                    />
                    Basic
                  </label>
                  <label className="flex text items-center">
                    <input
                      type="radio"
                      name="membershipTier"
                      value="verified"
                      checked={membershipTier === "verified"}
                      onChange={() => setMembershipTier("verified")}
                      className="mr-2"
                    />
                    <Image src="/icons/verified2.png" alt="Verified Icon" width={20} height={20} />
                    Verified
                  </label>
                </div>
                <label className="block mt-4 text">Profile Type</label>
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
                <label className="text block mt-4">Role</label>
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
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Dynamic Preview */}
        {(currentStep === 2 || currentStep === 3) && (
          <div className="w-full md:w-1/2 p-4 md:sticky self-center flex flex-col items-center">
            <div className={`${containerStyle} w-full`}>
              <div className="relative w-full mb-4 h-32 bg-gray-700 rounded-md flex justify-center items-center">
                {bannerImage ? (
                  <Image
                    src={bannerImage}
                    alt="Banner Preview"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                ) : (
                  <span className="text-gray-400">Banner Placeholder</span>
                )}
              </div>
              <label className="custom-upload-button" htmlFor="banner-upload">
                <input
                  type="file"
                  id="banner-upload"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e, setBannerImage)}
                />
                <div className={customUploadButtonStyle}>Upload Banner Image</div>
              </label>
              <div className="relative w-24 h-24 mt-4 mb-2 rounded-full overflow-hidden border border-gray-300">
                {profilePicture ? (
                  <Image
                    src={profilePicture}
                    alt="Profile Preview"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                ) : (
                  <div className="flex justify-center w-full text-black text-center items-center h-full bg-gray-200">
                    <span>Profile Placeholder</span>
                  </div>
                )}
              </div>
              <label className="custom-upload-button" htmlFor="profile-upload">
                <input
                  type="file"
                  id="profile-upload"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e, setProfilePicture)}
                />
                <div className={customUploadButtonStyle}>Upload Profile Image</div>
              </label>
              <div className="mt-4 text-left w-full">
                <h3 className="font-bold text-lg flex flex-row">
                  {displayName || "Display Name"}{" "}
                  {membershipTier === "verified" && (
                    <Image src="/icons/verified2.png" alt="Verified" width={16} height={16} />
                  )}
                </h3>
                <p className="text-sm text-gray-400">@{username || "username"}</p>
                <p className="mt-2">{about || "Your introduction will appear here."}</p>
              </div>
              {currentStep === totalSteps && (
                <button
                  onClick={handleSubmit}
                  className="mt-4 text gradient-button p-2 rounded-md w-full"
                  disabled={loading}
                >
                  {loading ? "Creating Profile..." : "Submit Profile"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-4 md:fixed md:bottom-4 md:right-4 flex justify-center md:justify-end space-x-4">
        {currentStep > 1 && (
          <button
            onClick={prevStep}
            className="p-2 text border rounded-md hover:bg-gray-100 hover:text-yellow-700 transition"
          >
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
