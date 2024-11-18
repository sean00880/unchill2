// src/app/documentation/[slug]/page.tsx
'use client'; // Add this line to indicate that this is a client-side component
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import React from 'react';

const docs = [
  {
    title: 'MemeLinked Platform Overview',
    href: 'platform-overview',
    content: (
      <>
        <div className="lg:ml-[26%] mt-[10vh] items-center justify-center flex flex-col p-6 glassmorphism rounded-xl shadow-2xl backdrop-blur-lg transition-transform hover:shadow-glow">
          <Image
            src="/images/platform-overview.png"
            alt="MemeLinked Platform Overview"
            width={1000}
            height={400}
            className="rounded-lg shadow-lg transform hover:scale-105 my-10 transition-transform duration-500"
            style={{ boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)' }}
          />
          <h1 className="text-5xl font-extrabold mb-4 text-white">MemeLinked Platform Overview</h1>
          <div className="w-full h-[2px] bg-yellow-500 mb-6"></div>
          <p className="text-lg mb-6 text-gray-200">
            MemeLinked brings together the best of decentralized finance (DeFi) and social networking, offering users a comprehensive platform to connect, engage, and leverage powerful financial tools within a community-driven ecosystem.
          </p>
          <h3 className="text-3xl font-semibold mt-8 mb-4 text-white">Core Features of MemeLinked:</h3>
          <div className="w-1/2 h-[2px] bg-yellow-500 mb-4"></div>
          <ul className="list-disc ml-8 text-gray-200 text-lg space-y-2">
            <li><strong>Community Engagement:</strong> Participate in discussions, join groups, and connect with like-minded DeFi enthusiasts.</li>
            <li><strong>DeFi Tool Integration:</strong> Access portfolio tracking, analytics, and strategic insights within the platform.</li>
            <li><strong>Influencer Spotlights:</strong> Discover trending influencers, view their profiles, and follow their DeFi insights.</li>
          </ul>
          <Image
            src="/images/platform-features.png"
            alt="Platform Features"
            width={1000}
            height={400}
            className="rounded-lg shadow-lg transform hover:scale-105 my-10 transition-transform duration-500"
            style={{ boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)' }}
          />
          <p className="text-lg mt-6 text-gray-200">
            The platform's unique combination of social and financial tools empowers users to not only stay informed but also actively participate and grow within the DeFi space.
          </p>
        </div>
      </>
    ),
  },
  {
    title: 'GameFi’s Role in the MemeLinked Ecosystem',
    href: 'gamefi-role',
    content: (
      <>
        <div className="lg:ml-[26%] mt-[10vh] items-center justify-center flex flex-col p-6 glassmorphism rounded-xl shadow-2xl backdrop-blur-lg transition-transform hover:shadow-glow">
          <h2 className="text-4xl font-bold mb-6 text-red-500">DETAILED DOCUMENTATION COMING SOON</h2>
          <Image
            src="/images/gamefi-overview.png"
            alt="GameFi Role"
            width={1000}
            height={400}
            className="rounded-lg shadow-lg transform hover:scale-105 my-10 transition-transform duration-500"
            style={{ boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)' }}
          />
          <h1 className="text-5xl font-extrabold mb-4 text-white">GameFi’s Role in the MemeLinked Ecosystem</h1>
          <div className="w-full h-[2px] bg-yellow-500 mb-6"></div>
          <p className="text-lg mb-6 text-gray-200">
            GameFi is an integral part of MemeLinked, bridging the gap between finance and entertainment. By incorporating engaging gameplay mechanics, MemeLinked encourages users to interact with the ecosystem in innovative ways.
          </p>
        </div>
      </>
    ),
  },
  {
    title: 'The Future of Meme-Driven Finance',
    href: 'meme-finance-future',
    content: (
      <>
        <div className="lg:ml-[26%] mt-[10vh] items-center justify-center flex flex-col p-6 glassmorphism rounded-xl shadow-2xl backdrop-blur-lg transition-transform hover:shadow-glow">
          <Image
            src="/images/meme-finance-future.png"
            alt="Meme-Driven Finance"
            width={1000}
            height={400}
            className="rounded-lg shadow-lg transform hover:scale-105 my-10 transition-transform duration-500"
            style={{ boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)' }}
          />
          <h1 className="text-5xl font-extrabold mb-4 text-white">The Future of Meme-Driven Finance</h1>
          <div className="w-full h-[2px] bg-yellow-500 mb-6"></div>
          <p className="text-lg mb-6 text-gray-200">
            The intersection of memes and finance is rapidly evolving. MemeLinked is at the forefront, harnessing the viral nature of memes to drive community engagement and financial growth. The platform envisions a future where users can participate in a decentralized, meme-driven economy that balances fun with practical financial gains.
          </p>
          <h3 className="text-3xl font-semibold mt-8 mb-4 text-white">Key Future Developments:</h3>
          <ul className="list-disc ml-8 text-gray-200 text-lg space-y-2">
            <li><strong>Community-Led Innovation:</strong> Users will have opportunities to propose and vote on platform updates.</li>
            <li><strong>Expanded DeFi Integration:</strong> More tools to enhance financial decision-making and strategy within the platform.</li>
            <li><strong>Strategic Partnerships:</strong> Collaborations with other DeFi projects to boost the ecosystem’s capabilities.</li>
          </ul>
          <p className="text-lg mt-6 text-gray-200">
            By fostering a collaborative and engaging environment, MemeLinked continues to redefine the possibilities of meme-based financial platforms.
          </p>
        </div>
      </>
    ),
  },
  // Add more posts as needed...
];

export default function DocumentationPage() {
  const params = useParams();
  const slug = params?.slug;

  const docContent = docs.find((doc) => doc.href === slug);

  if (!docContent) {
    return notFound(); // Exit if no content found
  }

  return (
    <div className="p-4">
      {docContent.content}
    </div>
  );
}
