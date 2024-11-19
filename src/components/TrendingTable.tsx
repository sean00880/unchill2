"use client";
import { useState } from 'react';
import Image from 'next/image';

interface TrendingTableProps {
  isDarkMode: boolean;
}

interface Profile {
  name: string;
  role: string;
  rating: number;
  badge: string | null;
  totalRatings: number;
}

export default function TrendingTable({ isDarkMode }: TrendingTableProps) {
  // Mock data for influencer profiles
  const trendingProfiles: Profile[] = [
    { name: 'John', role: 'Web Designer', rating: 4.8, badge: 'gold', totalRatings: 49 },
    { name: 'Mike', role: 'Developer', rating: 4.6, badge: 'blue', totalRatings: 32 },
    { name: 'Jay', role: 'Raider', rating: 4.2, badge: null, totalRatings: 20 },
    { name: 'Joe', role: 'Raider', rating: 4.2, badge: null, totalRatings: 20 },
    { name: 'Emptress', role: 'Raider', rating: 4.2, badge: null, totalRatings: 20 },
  ];

  return (
    <section className={`trending-table glass ounded-xl ${isDarkMode ? 'bg-opacity-50' : 'bg-opacity-30'} backdrop-blur-md flex flex-col mt-4`}>
      <h2 className={` mb-4 ${isDarkMode ? 'text-[yellow]' : 'text-[#fdd63a]'} text-center`}>Trending Influencers</h2>
      <table className="w-full border-separate border-spacing-2">
        <thead>
          <tr className="text-center border-b border-gray-400">
            <th className="p-2">Rank</th>
            <th className="p-2">Name</th>
            <th className="p-2">Role</th>
            <th className="p-2">Rating</th>
          </tr>
        </thead>
        <tbody>
          {trendingProfiles.map((profile, index) => (
            <TrendingRow key={index} profile={profile} index={index} isDarkMode={isDarkMode} />
          ))}
        </tbody>
      </table>
    </section>
  );
}

interface TrendingRowProps {
  profile: Profile;
  index: number;
  isDarkMode: boolean;
}

function TrendingRow({ profile, index, isDarkMode }: TrendingRowProps) {
  // Local state for each row
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const handleStarClick = (rating: number) => {
    setSelectedRating(rating);
    // Logic to update ratings dynamically in Supabase or database would go here
  };

  return (
    <tr className={` ${isDarkMode ? 'bg-card-bg-dark' : 'bg-card-bg-light'} border rounded-lg text-center align-middle`}>
      <td className="p-2 align-middle">{index + 1}</td>
      <td className="p-2 flex flex-col items-center justify-center align-middle">
        {/* Circular PFP */}
        <div className="w-12 h-12 rounded-full overflow-hidden mb-2">
          <Image
            src="/images/default_logo.jpg"
            alt="Profile Picture"
            width={100}
            height={100}
            className="object-cover"
          />
        </div>
        <div className="flex items-center justify-center">
          {profile.name}
          {(profile.badge === 'gold' || profile.badge === 'blue') && (
            <Image
              src="/icons/verified.png"
              alt={`${profile.badge} verified`}
              width={16}
              height={16}
              className="ml-2"
            />
          )}
        </div>
      </td>
      <td className="p-2 my-6 align-middle">{profile.role}</td>
      <td className="my-6 p-2 flex flex-col items-center justify-center align-middle">
        {/* MEMELINKED Recommended badge for the top 3 */}
        {index < 3 && (
          <div
            className="recommended-badge flex items-center justify-center relative mb-2"
            onMouseEnter={() => setTooltipVisible(true)}
            onMouseLeave={() => setTooltipVisible(false)}
          >
            <span>MEMELINKED Recommended</span>
            <span className="info-icon ml-1">ℹ️</span>
            {isTooltipVisible && (
              <div className="tooltip absolute top-6 left-1/2 transform -translate-x-1/2 bg-gray-700 text p-2 rounded shadow-lg text-xs z-10">
                Recommended for their outstanding performance and ratings.
              </div>
            )}
          </div>
        )}
        {/* Interactive star rating */}
        <div className="flex justify-center items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              xmlns="http://www.w3.org/2000/svg"
              fill={star <= (hoveredRating || selectedRating || profile.rating) ? 'gold' : 'none'}
              stroke="gold"
              strokeWidth={1}
              viewBox="0 0 24 24"
              width="20"
              height="20"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(null)}
              onClick={() => handleStarClick(star)}
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
        </div>
        <span className="mt-2">{profile.rating.toFixed(1)} | {profile.totalRatings} total ratings</span>
      </td>
    </tr>
  );
}
