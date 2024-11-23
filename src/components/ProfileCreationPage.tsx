'use client';
import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const supabase = createClientComponentClient();

export default function ProfileCreationPage() {
  const { displayName, setDisplayName, username, setUsername } = useAuthContext();
  const [role, setRole] = useState('');
  const [bio, setBio] = useState('');
  const [socialLinks, setSocialLinks] = useState({ twitter: '', telegram: '' });
  const [interests, setInterests] = useState<string[]>([]);
  const [privacy, setPrivacy] = useState('public');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfilePicture(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Save profile data to Supabase
    try {
      let profilePicUrl = '';
      if (profilePicture) {
        const { data, error } = await supabase.storage
          .from('profile-pictures')
          .upload(`public/${username}-profile`, profilePicture);

        if (error) throw error;
        profilePicUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/profile-pictures/${data.path}`;
      }

      const { error } = await supabase
        .from('profiles')
        .insert([
          {
            display_name: displayName,
            username,
            role,
            bio,
            twitter: socialLinks.twitter,
            telegram: socialLinks.telegram,
            interests,
            privacy,
            profile_picture: profilePicUrl,
          },
        ]);

      if (error) throw error;

      alert('Profile created successfully!');
    } catch (error) {
      console.error('Error creating profile:', error);
      alert('Failed to create profile. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-800 text-white rounded-md">
      <h2 className="text-2xl font-bold mb-4">Create Your Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Profile Image Upload */}
        <label className="block">
          Profile Image
          <input type="file" className="block w-full mt-2" onChange={handleImageUpload} />
        </label>

        {/* Display Name */}
        <label className="block">
          Display Name
          <input
            type="text"
            className="w-full p-2 border rounded mt-2 bg-transparent"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Enter your display name"
          />
        </label>

        {/* Username */}
        <label className="block">
          Username
          <input
            type="text"
            className="w-full p-2 border rounded mt-2 bg-transparent"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Create a unique username"
          />
        </label>

        {/* Role */}
        <label className="block">
          Role/Title
          <select
            className="w-full p-2 border rounded mt-2 bg-transparent"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select your role</option>
            <option value="influencer">Influencer</option>
            <option value="developer">Developer</option>
            <option value="trader">Trader</option>
            <option value="shiller">Shiller</option>
            <option value="NFT Community">NFT Community</option>
          </select>
        </label>

        {/* Bio */}
        <label className="block">
          Bio/Introduction
          <textarea
            className="w-full p-2 border rounded mt-2 bg-transparent"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write a short introduction about yourself"
          />
        </label>

        {/* Social Links */}
        <label className="block">
          Social Links
          <div className="mt-2 space-y-2">
            <input
              type="text"
              className="w-full p-2 border rounded bg-transparent"
              value={socialLinks.twitter}
              onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
              placeholder="Twitter URL"
            />
            <input
              type="text"
              className="w-full p-2 border rounded bg-transparent"
              value={socialLinks.telegram}
              onChange={(e) => setSocialLinks({ ...socialLinks, telegram: e.target.value })}
              placeholder="Telegram URL"
            />
          </div>
        </label>

        {/* Interests */}
        <label className="block">
          Tags/Interests
          <select
            multiple
            className="w-full p-2 border rounded mt-2 bg-transparent"
            value={interests}
            onChange={(e) => setInterests(Array.from(e.target.selectedOptions, option => option.value))}
          >
            <option value="DeFi">DeFi</option>
            <option value="NFTs">NFTs</option>
            <option value="Trading">Trading</option>
            <option value="Shilling">Shilling</option>
            <option value="Web3 Development">Web3 Development</option>
          </select>
        </label>

        {/* Privacy Settings */}
        <label className="block">
          Privacy Settings
          <select
            className="w-full p-2 border rounded mt-2 bg-transparent"
            value={privacy}
            onChange={(e) => setPrivacy(e.target.value)}
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="followers">Followers Only</option>
          </select>
        </label>

        {/* Submit Button */}
        <button type="submit" className="w-full p-3 mt-4 bg-blue-500 rounded text-white">
          Create Profile
        </button>
      </form>
    </div>
  );
}
