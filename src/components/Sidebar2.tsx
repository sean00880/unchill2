// src/components/Sidebar.tsx
"use client";
import React from 'react';
import Link from 'next/link';

// Sidebar component with static blog post links
const Sidebar: React.FC = () => {
  const staticPosts = [
    { title: 'How MemeLinked Integrates DeFi and Social Networking', href: '/blog/defi-social-networking' },
    { title: 'GameFi’s Role in the MemeLinked Ecosystem', href: '/blog/gamefi-role' },
    { title: 'The Future of Meme-Driven Finance', href: '/blog/meme-finance-future' },
    // Add more blog post links here if needed
  ];

  return (
    <aside className="w-1/4 bg-black pt-[10vh] fixed h-full text-white p-2 hidden lg:block">
      <h2 className="text-lg font-bold mb-4">Recent Posts</h2>
      <ul className="space-y-2">
        {staticPosts.map((post, index) => (
          <li key={index}>
            <Link href={post.href} className="hover:text-yellow-500 transition">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
