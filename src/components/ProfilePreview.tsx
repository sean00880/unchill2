"use client";

import React from "react";
import Image from "next/image";

interface ProfilePreviewProps {
  profileData: {
    displayName: string;
    username: string;
    about: string;
    profilePicture: File | null;
    bannerImage: File | null;
    membershipTier: string;
  };
}

export default function ProfilePreview({ profileData }: ProfilePreviewProps) {
  return (
    <div className="p-4 bg-black rounded-md shadow-lg mx-auto">
      {/* Banner Image */}
      <div className="relative h-32 bg-gray-700 rounded-t-md flex items-center justify-center overflow-hidden">
        {profileData.bannerImage ? (
          <Image
            src={URL.createObjectURL(profileData.bannerImage)}
            alt="Banner"
            layout="fill"
            objectFit="cover"
            className="rounded-t-md"
          />
        ) : (
          <span className="text-gray-400">Banner Placeholder</span>
        )}
      </div>

      {/* Profile Picture */}
      <div className="relative left-0 -mt-12 flex ">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-800 bg-gray-200">
          {profileData.profilePicture ? (
            <Image
              src={URL.createObjectURL(profileData.profilePicture)}
              alt="Profile"
              layout="fill"
              objectFit="cover"
            />
          ) : (
            <div className="flex justify-center items-center h-full">
              <span>Profile Placeholder</span>
            </div>
          )}
        </div>
      </div>

      {/* Display Name and Username */}
      <div className="text-center mt-4">
        <h3 className=" text-white white flex items-center justify-center">
          {profileData.displayName || "Display Name"}
          {profileData.membershipTier === "verified" && (
            <Image
              src="/icons/verified2.png"
              alt="Verified"
              width={16}
              height={16}
              className="ml-2"
            />
          )}
        </h3>
        <p className="text-sm text-gray-400">@{profileData.username || "username"}</p>
      </div>

      {/* About Section */}
      <div className="mt-4 text-center px-4">
        <p className="text-sm text-gray-300">
          {profileData.about || "Your bio will appear here."}
        </p>
      </div>
    </div>
  );
}
