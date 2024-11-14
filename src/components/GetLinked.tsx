// src/components/GetLinked.tsx
"use client";
import { useState } from 'react';
import Image from 'next/image';

interface UserProps {
  username: string;
  handle: string;
  avatar: string;
  verified: boolean;
}

const GetLinked = () => {
  const users: UserProps[] = [
    { username: 'SportsCenter', handle: '@SportsCenter', avatar: '/avatars/sportscenter.png', verified: true },
    { username: 'Acid Toad', handle: '@AcidToadArmy', avatar: '/avatars/acidtoad.png', verified: true },
    { username: 'Jo Jigga', handle: '@FitLyfeApparel', avatar: '/avatars/jojigga.png', verified: false },
    // Add more users as needed
  ];

  const [linkedStatus, setLinkedStatus] = useState(
    users.map(() => false) // Initial status of not linked for each user
  );

  const handleLinkClick = (index: number) => {
    setLinkedStatus((prevStatus) => {
      const updatedStatus = [...prevStatus];
      updatedStatus[index] = !updatedStatus[index]; // Toggle the linked status
      return updatedStatus;
    });
  };

  return (
    <div className="get-linked-section mb-4 p-4 border rounded-lg">
      <h3 className="text-lg font-bold mb-3">GET <span>LINKED</span> WITH</h3>
      {users.map((user, index) => (
        <div key={index} className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Image src={user.avatar} alt={user.username} width={40} height={40} className="rounded-full" />
            <div className="ml-3">
              <span className="font-semibold">{user.username}</span>
              <div className="text-sm text-gray-500">{user.handle}</div>
            </div>
          </div>
          <button
            className="button"
            onClick={() => handleLinkClick(index)}
          >
            {linkedStatus[index] ? 'LINKED' : 'LINK'}
          </button>
        </div>
      ))}
      <a href="#" className="text-blue-500 hover:underline">Show more</a>
    </div>
  );
};

export default GetLinked;
