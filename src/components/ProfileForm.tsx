"use client";

import React from "react";

interface ProfileData {
  displayName: string;
  username: string;
  about: string;
  profilePicture: File | null;
  bannerImage: File | null;
  profileType: string;
  role: string;
  membershipTier: string;
}

interface ProfileFormProps {
  profileData: ProfileData;
  handleChange: (field: keyof ProfileData, value: string | File | null) => void;
  errors: { [key: string]: string };
}

export default function ProfileForm({
  profileData,
  handleChange,
  errors,
}: ProfileFormProps) {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    handleChange(name as keyof ProfileData, value);
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "profilePicture" | "bannerImage"
  ) => {
    const file = e.target.files?.[0] || null;
    handleChange(field, file);
  };

  return (
    <div className="space-y-6 overflow-auto max-h-screen p-4">
      {/* Display Name */}
      <div>
        <label className="text" htmlFor="displayName">
          Display Name
        </label>
        <input
          id="displayName"
          name="displayName"
          type="text"
          value={profileData.displayName}
          onChange={handleInputChange}
          className={`input border ${
            errors.displayName ? "border-red-500" : "border-gray-300"
          } rounded px-2 py-1 w-full`}
        />
        {errors.displayName && (
          <p className="text-red-500 text-sm">{errors.displayName}</p>
        )}
      </div>

      {/* Username */}
      <div>
        <label className="text" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          value={profileData.username}
          onChange={handleInputChange}
          className={`border input ${
            errors.username ? "border-red-500" : "border-gray-300"
          } rounded px-2 py-1 w-full`}
        />
        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username}</p>
        )}
      </div>

      {/* About */}
      <div>
        <label className="text" htmlFor="about">
          Bio
        </label>
        <textarea
          id="about"
          name="about"
          value={profileData.about}
          onChange={handleInputChange}
          className={`border textarea ${
            errors.about ? "border-red-500" : "border-gray-300"
          } rounded px-2 py-1 w-full`}
        />
        {errors.about && <p className="text-red-500 text-sm">{errors.about}</p>}
      </div>

      {/* Membership Tier */}
      <div>
  <label className="text">Membership Tier</label>
  <div className="flex items-center space-x-4">
    {/* Basic Option */}
    <label className="flex items-center cursor-pointer relative">
      <input
        type="radio"
        name="membershipTier"
        value="basic"
        checked={profileData.membershipTier === "basic"}
        onChange={(e) => handleChange("membershipTier", e.target.value)}
        className="sr-only peer"
      />
         <div className="w-6 h-6 rounded-full border-2 border-gray-500 peer-checked:bg-yellow-500 peer-checked:border-yellow-500 peer-checked:ring-2 peer-checked:ring-blacks flex items-center justify-center">
        <div className="w-3 h-3 rounded-full peer-checked:bg-blue-500"></div>
      </div>
      <span className="ml-2 text">Basic</span>
    </label>

    {/* Verified Option */}
    <label className="flex items-center cursor-pointer relative">
      <input
        type="radio"
        name="membershipTier"
        value="verified"
        checked={profileData.membershipTier === "verified"}
        onChange={(e) => handleChange("membershipTier", e.target.value)}
        className="sr-only peer"
      />
      <div className="w-6 h-6 rounded-full border-2 border-gray-500 peer-checked:bg-yellow-500 peer-checked:border-yellow-500 peer-checked:ring-2 peer-checked:ring-black flex items-center justify-center">
        <div className="w-3 h-3 rounded-full peer-checked:bg-blue-500"></div>
      </div>
      <span className="ml-2 text">Verified</span>
    </label>
  </div>
</div>


      {/* Profile Type */}
      <div>
        <label className="text" htmlFor="profileType">
          Profile Type
        </label>
        <select
          id="profileType"
          value={profileData.profileType}
          onChange={(e) => handleChange("profileType", e.target.value)}
          className="border rounded px-2 py-1 w-full"
        >
          {["Crypto Project", "Individual", "Group"].map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Role */}
      <div>
        <label className="text" htmlFor="role">
          Role
        </label>
        <select
          id="role"
          value={profileData.role}
          onChange={(e) => handleChange("role", e.target.value)}
          className="border rounded px-2 py-1 w-full"
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
          ].map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      {/* Profile Picture */}
      <div>
        <label htmlFor="profilePicture" className="text">
          Profile Picture
        </label>
        <input
          id="profilePicture"
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, "profilePicture")}
        />
      </div>

      {/* Banner Image */}
      <div>
        <label htmlFor="bannerImage" className="text">
          Banner Image
        </label>
        <input
          id="bannerImage"
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, "bannerImage")}
        />
      </div>
    </div>
  );
}
