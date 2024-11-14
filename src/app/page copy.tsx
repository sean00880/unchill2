"use client";
// src/app/page.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import LandingLayout from '../components/LandingLayout';

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('utility');
  const [selectedImage, setSelectedImage] = useState('/images/default_logo.png');

  const images = [
    '/images/default_logo.png',
    '/images/default_logo.png',
    '/images/default_logo.png',
    '/images/default_logo.png',
    '/images/default_logo.png',
  ];

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <LandingLayout>
      {/* Hero Section */}
      <section className="hero-section flex flex-col items-center justify-center min-h-screen bg-cover bg-center relative">
        <div className="absolute inset-0 bg-[#090909] bg-opacity-50"></div>
        <div className="z-10 text-center text-white p-6">
          <Image src="/logo.png" width={200} height={200} alt="MemeLinked Logo" className="w-32 h-32 mb-4" />
          <h1 className="text-5xl font-extrabold mb-2"><span className="meme animate-glitch">Meme</span><span className="animate-glitch2">LINKED</span></h1>
          <p className="text-lg mb-6">
            A DeFi project on Ethereum, part of the Monkey Shit Inu ecosystem, where memes meet decentralized finance.
          </p>
          <div className="bg-yellow-500 text-black px-4 py-2 rounded-md mb-2 hover:bg-yellow-600 cursor-pointer">
            Official Contract Address: <span className="font-mono">0xYourContractAddress</span>
          </div>
          <button className="px-6 py-3 bg-yellow-500 text-black rounded-lg shadow hover:bg-yellow-600">
            Connect Wallet
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section bg-[#090909] text-white py-16 px-8">
  <div className="max-w-4xl mx-auto">
    <h2 className="text-4xl font-bold mb-6 text-center">About MemeLinked</h2>
    <p className="text-lg mb-4">
      MemeLinked is more than just a token; it&apos;s a unique blend of meme culture and utility within the MSI ecosystem.
      Founded by the visionary Pablo Cro, MemeLinked offers an engaging social network that fuels organic growth and
      exposure for real projects. Our platform bridges the gap between fun and functionality, empowering users to
      connect in a space where communities thrive and opportunities abound.
    </p>
    <div className="flex mt-8">
      <aside className="flex-none w-48">
        <button
          className={`tab-button w-full px-4 py-2 mb-2 text-left ${activeTab === 'utility' ? 'bg-yellow-500 text-black' : 'bg-gray-700 text-white hover:bg-yellow-500'}`}
          onClick={() => setActiveTab('utility')}
        >
          Utility
        </button>
        <button
          className={`tab-button w-full px-4 py-2 text-left ${activeTab === 'memes' ? 'bg-yellow-500 text-black' : 'bg-gray-700 text-white hover:bg-yellow-500'}`}
          onClick={() => setActiveTab('memes')}
        >
          Memes
        </button>
      </aside>
      <div className="flex-grow bg-[#090909] p-6 rounded-lg ml-4">
        {activeTab === 'utility' && (
          <div>
            <h3 className="text-2xl font-semibold mb-2">Powering Social Connectivity & GameFi</h3>
            <p>
              MemeLinked&apos;s core utility lies in its powerful social platform, enabling genuine project exposure and active community interactions. The GameFi component, MonkeyKongRacing, adds immersive experiences to the MSI ecosystem, redefining engagement.
            </p>
          </div>
        )}
        {activeTab === 'memes' && (
          <div>
            <h3 className="text-2xl font-semibold mb-2">Celebrating Meme Culture</h3>
            <div className="carousel-container">
              <Image src="/images/default_logo.png" alt="Meme Preview" width={900} height={550} className="w-full rounded-lg border border-yellow-500" />
              <div className="gallery mt-4 grid grid-cols-4 gap-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="relative">
                    <Image
                      src="/images/default_logo.png"
                      alt={`Gallery Item ${index + 1}`}
                      className="w-full h-auto cursor-pointer rounded-lg hover:border-2 hover:border-yellow-500" width={200} height={200}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
</section>
{/* Tokenomics Section */}
<section className="tokenomics-section bg-[#e0e0e0] text-white relative p-4 py-16">
  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 p-4">
    {/* Left Side - Tokenomics Overview */}
    <div className="tokenomics-content space-y-6">
      <h2 className="text-4xl font-bold mb-4">Tokenomics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Supply */}
        <div className="bg-[#090909] p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
          <h3 className="text-2xl font-semibold mb-2">Total Supply</h3>
          <p className="text-3xl font-bold text-yellow-500">1 Billion MEMELINKED</p>
          <p className="mt-2 text-sm text-gray-400">
            Carefully designed to ensure a fair distribution and community engagement.
          </p>
        </div>
        {/* Transaction Tax */}
        <div className="bg-[#090909] p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
          <h3 className="text-2xl font-semibold mb-2">Transaction Tax</h3>
          <p className="text-lg">
            <strong className="text-yellow-500">1%</strong> Marketing, 
            <strong className="text-yellow-500"> 1%</strong> Ecosystem Growth
          </p>
          <p className="mt-2 text-sm text-gray-400">
            Supports continuous development and community expansion with ETH redistribution to holders.
          </p>
        </div>
        {/* Liquidity Locked */}
        <div className="bg-[#090909] p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
          <h3 className="text-2xl font-semibold mb-2">Liquidity Lock</h3>
          <p className="text-lg text-yellow-500">100% Locked for 99.67 Years</p>
          <p className="mt-2 text-sm text-gray-400">
            Ensures long-term stability and trust within the ecosystem for seamless trading.
          </p>
        </div>
      </div>
      {/* Detailed Overview */}
      <div className="bg-[#090909] p-6 rounded-lg shadow-lg mt-6">
        <h3 className="text-2xl font-semibold mb-4">Detailed Tokenomics Overview</h3>
        <ul className="space-y-4 text-gray-300">
          <li>
            <strong className="text-yellow-500">1. Total Supply:</strong> 1 Billion MEMELINK ensures a balanced ecosystem, promoting growth and engagement.
          </li>
          <li>
            <strong className="text-yellow-500">2. Transaction Tax:</strong> A minimal 1% tax for marketing and 1% for ecosystem growth sustains project development and ETH rewards.
          </li>
          <li>
            <strong className="text-yellow-500">3. Liquidity Lock:</strong> Our commitment to a 100% liquidity lock for nearly a century guarantees confidence and market security.
          </li>
        </ul>
      </div>
    </div>

    {/* Right Side - Image with Effects */}
    <div className="relative">
      <div className="image-container rounded-lg overflow-hidden shadow-2xl border-4 border-white border-opacity-50 bg-gradient-to-b from-transparent to-gray-900">
        <Image
          src="/path/to/your-image.png"
          alt="Luxurious Shiba Inu"
          width={500}
          height={500}
          className="w-full h-auto transition-opacity duration-500 ease-in-out hover:opacity-100 parallax-effect"
        />
      </div>
      <style jsx>{`
        .parallax-effect {
          transform: translateZ(0);
          will-change: transform;
          animation: parallax 10s linear infinite;
        }
        .image-container:hover {
          animation: fadein 0.5s ease-in;
        }
        @keyframes parallax {
          0% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0); }
        }
        @keyframes fadein {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  </div>
</section>



      {/* Roadmap Section */}
      <section className="roadmap-section py-16 bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center neon-text">Roadmap</h2>
          <div className="roadmap-container relative">
            <div className="timeline absolute left-1/2 transform -translate-x-1/2 w-1 bg-yellow-500 h-full"></div>
            <ul className="space-y-12">
              {[
                {
                  phase: 'Phase 1: Platform Launch',
                  description: 'Initiate the MemeLinked platform with core utilities and social interaction features.',
                },
                {
                  phase: 'Phase 2: Community Engagement',
                  description: 'Host AMAs, exclusive meme contests, and interactive community events to build momentum.',
                },
                {
                  phase: 'Phase 3: Tier One Listings',
                  description: 'Secure partnerships and listings with top cryptocurrency exchanges for enhanced visibility.',
                },
                {
                  phase: 'Phase 4: Feature Expansion',
                  description: 'Integrate enhanced profile features and influencer dashboards to drive user engagement.',
                },
              ].map((item, index) => (
                <li key={index} className="relative flex items-start">
                  <div className="phase-marker bg-yellow-500 w-12 h-12 flex items-center justify-center rounded-full shadow-md">
                    <span className="text-black font-bold">{index + 1}</span>
                  </div>
                  <div className="phase-card ml-6 p-6 bg-[#090909] rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                    <h3 className="text-2xl font-semibold mb-2">{item.phase}</h3>
                    <p className="text-lg">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="cta-section bg-[#090909] text-white py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Future of Community-Driven DeFi</h2>
          <button className="px-8 py-4 bg-yellow-500 text-black rounded-lg shadow hover:bg-yellow-600">
            Get Started
          </button>
        </div>
      </section>
    </LandingLayout>
  );
};

export default HomePage;
