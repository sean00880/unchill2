// src/components/Post.tsx
"use client";
import React, { useState } from 'react';
import Image from 'next/image';

interface PostProps {
  username: string;
  avatar: string;
  timePosted: string;
  content: string;
  isDarkMode: boolean;
  verified: boolean;
  media?: string[]; // Array of image URLs
}

const Post: React.FC<PostProps> = ({ username, avatar, timePosted, content, isDarkMode, verified, media }) => {
  const mediaCount = media ? media.length : 0;
  const gridCols = mediaCount >= 3 ? 'grid-cols-3' : mediaCount === 2 ? 'grid-cols-2' : 'grid-cols-1';

  // State for thumbs up/down counters and user interaction
  const [thumbsUpCount, setThumbsUpCount] = useState(0);
  const [thumbsDownCount, setThumbsDownCount] = useState(0);
  const [userReaction, setUserReaction] = useState<null | 'up' | 'down'>(null);

  const handleThumbsUp = () => {
    if (userReaction === 'up') {
      setThumbsUpCount(thumbsUpCount - 1);
      setUserReaction(null);
    } else {
      setThumbsUpCount(thumbsUpCount + 1);
      if (userReaction === 'down') setThumbsDownCount(thumbsDownCount - 1);
      setUserReaction('up');
    }
  };

  const handleThumbsDown = () => {
    if (userReaction === 'down') {
      setThumbsDownCount(thumbsDownCount - 1);
      setUserReaction(null);
    } else {
      setThumbsDownCount(thumbsDownCount + 1);
      if (userReaction === 'up') setThumbsUpCount(thumbsUpCount - 1);
      setUserReaction('down');
    }
  };

  return (
    <div className={`post mb-6 p-4 border rounded-lg text`}>
      <div className="post-header flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Image src={avatar} alt={`${username}'s avatar`} width={40} height={40} className="rounded-full mr-3" />
          <div>
            <span className="font-semibold flex items-center">
              {username}
              {verified && (
                <Image
                  src="/icons/verified.png"
                  alt="Verified icon"
                  className="w-4 h-4 ml-1"
                  width={16}
                  height={16}
                />
              )}
            </span>
            <span className="text-sm text-gray-500"> • {timePosted}</span>
          </div>
        </div>
        <div className="flex items-center">
          <button onClick={handleThumbsUp} className={`mr-2 ${userReaction === 'up' ? 'text-yellow-500' : 'text-gray-500'}`}>
            👍 {thumbsUpCount}
          </button>
          <button onClick={handleThumbsDown} className={`${userReaction === 'down' ? 'text-red-500' : 'text-gray-500'}`}>
            👎 {thumbsDownCount}
          </button>
        </div>
      </div>
      <p className="text-base mb-3">{content}</p>
      {media && media.length > 0 && (
        <div className={`post-media grid ${gridCols} gap-2`}>
          {media.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`Post media ${index + 1}`}
              width={250}
              height={250}
              className="rounded-lg object-cover"
            />
          ))}
        </div>
      )}
      <div className="post-interactions flex justify-between mt-3">
        <button className="button">💬 Comments</button>
        <button className="button">🔁 Reshare</button>
        <button className="button">🚀 Boost</button>
      </div>
    </div>
  );
};

export default Post;
