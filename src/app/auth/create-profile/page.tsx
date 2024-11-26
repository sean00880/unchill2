"use client";

import { useState } from "react";
import ProfileForm from "../../../components/ProfileForm";
import ProfilePreview from "../../../components/ProfilePreview";
import AlertModal from "../../../components/AlertModal";
import { supabase } from "../../../utils/supaBaseClient";
import { useAuthContext } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function CreateProfilePage() {
  const { walletAddress, accountIdentifier } = useAuthContext();
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
  });

  const [errors, setErrors] = useState({
    displayName: "",
    username: "",
    about: "",
  });

  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [showRedirect, setShowRedirect] = useState(false); // To handle the redirect modal logic
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

  const isFormValid = !Object.values(errors).some((error) => error) &&
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

      if (error) {
        console.error("Error uploading image:", error.message);
        throw new Error("Failed to upload image.");
      }
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
  
      const payload = {
        display_name: profileData.displayName,
        username: profileData.username,
        about: profileData.about,
        account_identifier: accountIdentifier,
        profile_image_url: profileImageUrl,
        banner_image_url: bannerImageUrl,
        profile_type: profileData.profileType,
        role: profileData.role,
        membership_tier: profileData.membershipTier,
      };
  
      console.log("Payload being sent to Supabase:", payload); // Log the payload to verify data
  
      const { data, error } = await supabase.from("profiles").insert(payload);
  
      console.log("Supabase response:", { data, error }); // Log the response for debugging
  
      if (error) {
        console.error("Supabase Error:", error);
        throw new Error("Failed to create profile.");
      }
  
      setAlertMessage("Profile created successfully!");
      setShowRedirect(true); // Show modal for redirect
    } catch (error) {
      console.error("Profile creation failed:", error); // Log the error for debugging
  
      // Narrow the error type to properly access the `message` property
      if (error instanceof Error) {
        setAlertMessage(error.message);
      } else {
        setAlertMessage("Failed to create profile due to an unknown error.");
      }
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
            router.push("/auth/overview");
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
