// src/components/Post.tsx
"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Comment from './Comment'; // Import the Comment component

// Sample data for comments (hardcoded for now)
const sampleComments = [
  {
    username: 'DeFiExpert',
    avatar: '/avatars/defiexpert.png',
    timePosted: '30m ago',
    content: 'Great post! I completely agree with your thoughts on DeFi.',
    media: ['/images/comment_image.png'],
    verified: true,
  },
  {
    username: 'CryptoAnalyst',
    avatar: '/avatars/cryptoanalyst.png',
    timePosted: '45m ago',
    content: 'DeFi is the future! Thanks for sharing your insights.',
    verified: false,
  },
];

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
  const [thumbsUpCount, setThumbsUpCount] = useState(0);
  const [thumbsDownCount, setThumbsDownCount] = useState(0);
  const [userReaction, setUserReaction] = useState<null | 'up' | 'down'>(null);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const [commentsCount, setCommentsCount] = useState(30); // Example count
  const [resharesCount, setResharesCount] = useState(14); // Example count
  const [boostsCount, setBoostsCount] = useState(299); // Example count
  const [linkedProfilesCount, setLinkedProfilesCount] = useState(68); // Example count for "Linked" profiles
  const [previewImage, setPreviewImage] = useState<string | null>(null);

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

  const handleImageClick = (image: string) => {
    setPreviewImage(image);
  };

  const handleClosePreview = () => {
    setPreviewImage(null);
  };

  const toggleCommentsVisibility = () => {
    setIsCommentsVisible(!isCommentsVisible);
  };

  const renderMedia = () => {
    if (!media || media.length === 0) return null;

    if (media.length === 1) {
      return (
        <div className="col-span-1">
          <Image
            src={media[0]}
            alt="Single post media"
            width={500}
            height={500}
            className="rounded-lg object-cover w-full cursor-pointer"
            onClick={() => handleImageClick(media[0])}
          />
        </div>
      );
    }

    return (
      <div className={`post-media grid ${media.length <= 2 ? 'grid-cols-2' : 'grid-cols-2'} gap-2`}>
        {media.slice(0, 4).map((image, index) => (
          <div key={index} className="relative">
            <Image
              src={image}
              alt={`Post media ${index + 1}`}
              width={250}
              height={250}
              className="rounded-lg object-cover w-full h-full cursor-pointer"
              onClick={() => handleImageClick(image)}
            />
            {index === 3 && media.length > 4 && (
              <div className="absolute inset-0 bg-[#090909] bg-opacity-50 flex items-center justify-center text-white font-bold text-xl rounded-lg">
                +{media.length - 4}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={`post mb-6 p-4 border rounded-lg ${isDarkMode ? 'text' : 'bg-white text-gray-800'}`}>
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
            <div className="mt-2">
        <span className="text-sm">{linkedProfilesCount} Linked</span>
      </div>
            <span className="text-sm text-gray-500"> • {timePosted}</span>
          </div>
        </div>
        <div className="flex items-center flex-col">
            <div className="row">
          <button onClick={handleThumbsUp} className={`mr-2 ${userReaction === 'up' ? 'text-yellow-500' : 'text-gray-500'}`}>
            👍 {thumbsUpCount}
          </button>
          <button onClick={handleThumbsDown} className={`${userReaction === 'down' ? 'text-red-500' : 'text-gray-500'}`}>
            👎 {thumbsDownCount}
          </button>
          </div>
          
        </div>
        
      </div>
      <p className="text-base mb-3">{content}</p>
      {renderMedia()}
      <div className="post-interactions flex justify-between mt-3">
        <button className="button" onClick={toggleCommentsVisibility}>
          💬 <br/>
          {commentsCount} Comments
        </button>
        <button className="button">
          🔁 <br/>
          {resharesCount} Reshares
        </button>
        <button className="button">
          🚀 <br/>
          {boostsCount} Boosts
        </button>
      </div>
     

      {previewImage && (
        <div className="fixed inset-0 bg-[#090909] bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative">
            <Image src={previewImage} alt="Preview" width={600} height={600} className="rounded-lg" />
            <button onClick={handleClosePreview} className="absolute top-2 right-2 text-white text-2xl">
              ✖
            </button>
          </div>
        </div>
      )}

      {isCommentsVisible && (
        <div className="comments-section mt-4">
          <h4 className=" mb-2">Comment</h4>
          {sampleComments.map((comment, index) => (
            <Comment key={index} {...comment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Post;
