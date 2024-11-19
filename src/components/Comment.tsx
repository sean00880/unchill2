// src/components/Comment.tsx
"use client";
import React, { useState } from 'react';
import Image from 'next/image';

interface CommentProps {
  username: string;
  avatar: string;
  timePosted: string;
  content: string;
  media?: string[]; // Array of image URLs
  verified: boolean;
}

const Comment: React.FC<CommentProps> = ({ username, avatar, timePosted, content, media, verified }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [userReaction, setUserReaction] = useState<null | 'like' | 'dislike'>(null);

  const handleLike = () => {
    if (userReaction === 'like') {
      setLikeCount(likeCount - 1);
      setUserReaction(null);
    } else {
      setLikeCount(likeCount + 1);
      if (userReaction === 'dislike') setDislikeCount(dislikeCount - 1);
      setUserReaction('like');
    }
  };

  const handleDislike = () => {
    if (userReaction === 'dislike') {
      setDislikeCount(dislikeCount - 1);
      setUserReaction(null);
    } else {
      setDislikeCount(dislikeCount + 1);
      if (userReaction === 'like') setLikeCount(likeCount - 1);
      setUserReaction('dislike');
    }
  };

  return (
    <div className="comment mb-4 p-3 border rounded-lg">
      <div className="flex items-center mb-2">
        <Image src={avatar} alt={`${username}'s avatar`} width={30} height={30} className="rounded-full mr-2" />
        <div>
          <span className="font-semibold">{username}</span>
          {verified && <Image src="/icons/verified.png" alt="Verified" width={12} height={12} className="ml-1" />}
          <span className="text-xs text-gray-500"> • {timePosted}</span>
        </div>
      </div>
      <p className="text-sm mb-2">{content}</p>
      {media && media.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {media.map((img, idx) => (
            <Image key={idx} src={img} alt={`Comment media ${idx + 1}`} width={100} height={100} className="rounded-lg object-cover" />
          ))}
        </div>
      )}
      <div className="flex items-center mt-2">
        <button onClick={handleLike} className={`mr-2 ${userReaction === 'like' ? 'text-yellow-500' : 'text-gray-500'}`}>
          👍 {likeCount}
        </button>
        <button onClick={handleDislike} className={`${userReaction === 'dislike' ? 'text-red-500' : 'text-gray-500'}`}>
          👎 {dislikeCount}
        </button>
      </div>
    </div>
  );
};

export default Comment;
