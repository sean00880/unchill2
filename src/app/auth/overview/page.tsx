"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../utils/supaBaseClient";
import { useAuthContext } from "../../../context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProfileData {
  display_name: string;
  username: string;
  about: string;
  profile_image_url: string | null;
  banner_image_url: string | null;
  membership_tier: string;
  role: string;
  profile_type: string;
}

export default function ProfileOverviewPage() {
  const { accountIdentifier, logout } = useAuthContext();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!accountIdentifier) {
        router.push("/auth/connect");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("account_identifier", accountIdentifier)
        .single();

      if (error || !data) {
        router.push("/auth/create-profile");
        return;
      }

      setProfileData(data);
      setLoading(false);
    };

    fetchProfile();
  }, [accountIdentifier, router]);

  const handleLogout = async () => {
    await logout();
    router.push("/auth/connect");
  };

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-dark text-white flex flex-col items-center justify-center p-6">
      {profileData && (
        <div className="w-full md:w-2/3 bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="text-center">
            {profileData.banner_image_url ? (
              <Image
                src={profileData.banner_image_url}
                alt="Banner"
                width={500}
                height={200}
                className="rounded-md"
              />
            ) : (
              <div className="h-32 bg-gray-700 rounded-md"></div>
            )}
          </div>
          <div className="text-center mt-4">
            {profileData.profile_image_url ? (
              <Image
                src={profileData.profile_image_url}
                alt="Profile"
                width={96}
                height={96}
                className="rounded-full mx-auto"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-500 rounded-full mx-auto"></div>
            )}
          </div>
          <h3 className="text-2xl font-bold mt-4">{profileData.display_name}</h3>
          <p className="text-sm text-gray-400">@{profileData.username}</p>
          <p className="mt-2">{profileData.about}</p>
          <div className="mt-4">
            <p>
              <strong>Membership:</strong> {profileData.membership_tier}
            </p>
            <p>
              <strong>Role:</strong> {profileData.role}
            </p>
            <p>
              <strong>Profile Type:</strong> {profileData.profile_type}
            </p>
          </div>
          <button
            className="mt-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
