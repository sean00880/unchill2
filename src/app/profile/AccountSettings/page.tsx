// src/app/profile/AccountSettings/page.tsx
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { supabase } from "../../../utils/supaBaseClient"; // Import Supabase client

export default function AccountSettings() {
  const [profileData, setProfileData] = useState({
    id: "",
    display_name: "",
    username: "",
    about: "",
    password: "********", // Masked for display purposes
    profile_image_url: "",
    banner_image_url: "",
    membership_tier: "basic",
    profile_type: "Individual",
    role: "Normie",
    created_at: "",
  });
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", supabase.auth.user()?.id)
        .single();
      if (data) {
        setProfileData(data);
      }
      if (error) {
        console.error("Error fetching profile:", error.message);
      }
    }
    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          display_name: profileData.display_name,
          username: profileData.username,
          about: profileData.about,
          profile_image_url: profileData.profile_image_url,
          banner_image_url: profileData.banner_image_url,
          membership_tier: profileData.membership_tier,
          profile_type: profileData.profile_type,
          role: profileData.role,
        })
        .eq("id", profileData.id);

      if (error) {
        console.error("Error updating profile:", error.message);
        alert("Error updating profile: " + error.message);
      } else {
        alert("Profile updated successfully!");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-light-background text-white">
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-2xl mb-6"
      >
        Account Settings
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1">
          <label className="block text">ID</label>
          <input
            type="text"
            value={profileData.id}
            className="w-full p-2 border rounded-md bg-transparent text"
            readOnly
          />

          <label className="block mt-4 text">Display Name</label>
          <input
            type="text"
            name="display_name"
            value={profileData.display_name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md bg-transparent text"
          />

          <label className="block mt-4 text">Username</label>
          <input
            type="text"
            name="username"
            value={profileData.username}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md bg-transparent text"
          />

          <label className="block mt-4 text">About</label>
          <textarea
            name="about"
            value={profileData.about}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md bg-transparent text"
          />

          <label className="block mt-4 text">Password</label>
          <input
            type="password"
            value={isEditingPassword ? "" : profileData.password}
            disabled={!isEditingPassword}
            className="w-full p-2 border rounded-md bg-transparent text"
          />
          <button
            onClick={() => setIsEditingPassword(true)}
            className="mt-2 bg-yellow-700 text-white px-4 py-2 rounded-md"
          >
            {isEditingPassword ? "Change Password" : "Edit Password"}
          </button>
        </div>

        <div className="col-span-1">
          <label className="block text">Profile Image URL</label>
          <input
            type="text"
            name="profile_image_url"
            value={profileData.profile_image_url}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md bg-transparent text"
          />

          <label className="block mt-4 text">Banner Image URL</label>
          <input
            type="text"
            name="banner_image_url"
            value={profileData.banner_image_url}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md bg-transparent text"
          />

          <label className="block mt-4 text">Membership Tier</label>
          <input
            type="text"
            name="membership_tier"
            value={profileData.membership_tier}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md bg-transparent text"
          />

          <label className="block mt-4 text">Profile Type</label>
          <input
            type="text"
            name="profile_type"
            value={profileData.profile_type}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md bg-transparent text"
          />

          <label className="block mt-4 text">Role</label>
          <input
            type="text"
            name="role"
            value={profileData.role}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md bg-transparent text"
          />

          <label className="block mt-4 text">Created At</label>
          <input
            type="text"
            value={profileData.created_at}
            className="w-full p-2 border rounded-md bg-transparent text"
            readOnly
          />
        </div>
      </div>

      <button
        onClick={handleSaveChanges}
        className="mt-6 bg-green-600 text-white px-6 py-2 rounded-md"
        disabled={loading}
      >
        {loading ? "Saving Changes..." : "Save Changes"}
      </button>
    </div>
  );
}
