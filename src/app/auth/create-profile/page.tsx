"use client";

import { useState } from "react";
import ProfileForm from "../../../components/ProfileForm";
import ProfilePreview from "../../../components/ProfilePreview";
import AlertModal from "../../../components/AlertModal";
import { supabase } from "../../../utils/supaBaseClient";
import { useAuthContext } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import { generateShortId } from "../../../utils/idGenerator";

export default function CreateProfilePage() {
  const { walletAddress, accountIdentifier, blockchainWallet } = useAuthContext(); // Added blockchainWallet
  const router = useRouter();

  const [profileData, setProfileData] = useState({
    displayName: "",
    username: "",
    about: "",
    profilePicture: null as File | null,
    bannerImage: null as File | null,
    profileType: "Individual",
    role: "Normie",
    membershipTier: "basic",
    email: "",
    password: "",
    linked: [],
    links: [],
  });

  const [errors, setErrors] = useState({
    displayName: "",
    username: "",
    about: "",
  });

  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [showRedirect, setShowRedirect] = useState(false);

  const validateField = (field: string, value: string) => {
    if (field === "displayName" && (value.length < 3 || value.length > 50)) {
      return "Display Name must be 3–50 characters long.";
    }
    if (field === "username" && (value.length < 3 || value.length > 20)) {
      return "Username must be 3–20 characters long.";
    }
    if (field === "about" && value.length > 250) {
      return "About section cannot exceed 250 characters.";
    }
    return "";
  };

  const handleChange = (field: keyof typeof profileData, value: string | File | null) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (typeof value === "string") {
      setErrors((prev) => ({
        ...prev,
        [field]: validateField(field, value),
      }));
    }
  };

  const isFormValid =
    !Object.values(errors).some((error) => error) &&
    profileData.displayName &&
    profileData.username;

  const uploadImageToBucket = async (file: File | null, folder: string, filePrefix: string) => {
    if (!file) return null;

    try {
      const fileType = file.type.split("/")[1];
      const filename = `${filePrefix}.${fileType}`;
      const { error } = await supabase.storage
        .from("profile-images")
        .upload(`${folder}/${filename}`, file, {
          cacheControl: "3600",
          upsert: true,
          contentType: file.type,
        });

      if (error) throw new Error("Failed to upload image.");
      return `/api/${folder}/${filename}`;
    } catch (error) {
      console.error("Image upload failed:", error);
      throw error;
    }
  };

  const handleSubmitProfile = async () => {
    if (!walletAddress) {
      setAlertMessage("Please connect your wallet.");
      return;
    }
  
    if (!isFormValid) {
      setAlertMessage("Please fix all errors before submitting.");
      return;
    }
  
    setLoading(true);
    try {
      const profileFolder = profileData.username || "default";
      const profileImageUrl = await uploadImageToBucket(profileData.profilePicture, profileFolder, "profile");
      const bannerImageUrl = await uploadImageToBucket(profileData.bannerImage, profileFolder, "banner");
  
      const shortId = await generateShortId(); // Ensure globally unique short_id
      console.log("Generated short_id:", shortId);
  
      const payload = {
        display_name: profileData.displayName,
        username: profileData.username,
        about: profileData.about,
        account_identifier: accountIdentifier, // Group identifier
        wallet_address: walletAddress,
        blockchain_wallet: blockchainWallet, // Wallet and chain information
        profile_image_url: profileImageUrl,
        banner_image_url: bannerImageUrl,
        profile_type: profileData.profileType,
        role: profileData.role,
        membership_tier: profileData.membershipTier,
        email: profileData.email,
        password: profileData.password,
        linked: profileData.linked,
        links: profileData.links,
        short_id: shortId,
      };
  
      // Check if wallet_address already exists globally
      const { data: existingProfilesByWallet } = await supabase
        .from("profiles")
        .select("id, wallet_address")
        .eq("wallet_address", walletAddress);
  
      if (existingProfilesByWallet && existingProfilesByWallet.length > 0) {
        throw new Error("A profile already exists for this wallet address.");
      }
  
      // Check if username already exists within the same account_identifier
      const { data: existingProfilesByUsername } = await supabase
        .from("profiles")
        .select("id, username")
        .eq("account_identifier", accountIdentifier)
        .eq("username", profileData.username);
  
      if (existingProfilesByUsername && existingProfilesByUsername.length > 0) {
        throw new Error("A profile with the same username already exists under this account.");
      }
  
      // Insert new profile
      const { error } = await supabase.from("profiles").insert(payload);
      if (error) throw new Error(error.message);
  
      console.log("Profile created successfully:", payload);
  
      setAlertMessage("Profile created successfully!");
      setShowRedirect(true);
    } catch (error) {
      console.error("Profile creation failed:", error);
      setAlertMessage(error instanceof Error ? error.message : "Profile creation failed.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="auth flex flex-col md:flex-row min-h-screen">
      {alertMessage && !showRedirect && (
        <AlertModal message={alertMessage} onClose={() => setAlertMessage(null)} />
      )}

      {showRedirect && (
        <AlertModal
          message="Profile creation successful! Redirecting to overview..."
          onClose={() => {
            setShowRedirect(false);
            setTimeout(() => {
              router.push("/auth/overview");
            }, 300);
          }}
        />
      )}

      <div className="w-full md:w-1/2 overflow-auto p-4 mt-40">
        <ProfileForm profileData={profileData} handleChange={handleChange} errors={errors} />
      </div>

      <div className="w-full md:w-1/2 flex justify-center items-start">
        <div className="sticky top-20 p-6 w-full">
          <ProfilePreview profileData={profileData} />
          <div className="w-full mt-6">
            <button
              onClick={handleSubmitProfile}
              className="gradient-button p-2 rounded-md w-full"
              disabled={loading}
            >
              {loading ? "Creating Profile..." : "Submit Profile"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
