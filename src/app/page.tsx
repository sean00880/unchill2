"use client";
// src/app/page.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import LandingLayout from '../components/LandingLayout';
import Link from 'next/link';
import { FaTelegramPlane, FaTwitter } from "react-icons/fa";
const HomePage: React.FC = () => {
  
  const [selectedImage, setSelectedImage] = useState('/images/default_logo.png');
  const [aboutActiveTab, setAboutActiveTab] = useState('defi');
  const [activeTab, setActiveTab] = useState('blog'); // This is for the Blog/Documentation section
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
        <div className="z-10 text-center flex flex-col items-center text-white p-6">
          <Image src="/images/default_logo.jpg" width={200} height={200} alt="MemeLinked Logo" className="w-32 rounded-full h-32 mb-4" />
          <h1 className="text-5xl font-extrabold mb-2"><span className="meme animate-glitch">Meme</span><span className="animate-glitch2">LINKED</span></h1>
          <p className="text-lg mb-6">
            A DeFi project on Ethereum, part of the Monkey Shit Inu ecosystem, where memes meet decentralized finance.
          </p>
          <div className="bg-yellow-500 text-black px-4 py-2 rounded-md mb-2 hover:bg-yellow-600 cursor-pointer">
            Official Contract Address: <span className="font-mono">0xMemeLinkedContractAddress</span>
          </div>
          <button className="px-6 py-3 bg-yellow-500 text-black rounded-lg shadow hover:bg-yellow-600">
            Connect Wallet
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section bg-[#e0e0e0] text-black py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col">
        <h2 className="text-4xl font-bold mb-6 text-center landing-heading">About</h2>
        <div className="divider h-1 bg-yellow-500 mb-8 mx-auto w-1/4 left-0"></div>
        <p className="text-lg mb-4 text-center md:text-left">
          MemeLinked is more than just a token; it&apos;s a unique blend of meme culture and utility within the MSI ecosystem.
          Founded by the visionary Pablo Cro, MemeLinked offers an engaging social network that fuels organic growth and
          exposure for real projects. Our platform bridges the gap between fun and functionality, empowering users to
          connect in a space where communities thrive and opportunities abound.
        </p>
        <div className="flex flex-col md:flex-row mt-8">
          <aside className="flex-none w-full md:w-48 mb-4 md:mb-0 md:mr-4">
            <button
              className={`tab-button w-full px-4 py-2 my-2 rounded-sm text-left ${aboutActiveTab === 'defi' ? 'bg-[#090909] italic text-white' : 'bg-gray-700 text-white hover:bg-gray-900'}`}
              onClick={() => setAboutActiveTab('defi')}
            >
              DeFi Social Network
            </button>
            <button
              className={`tab-button w-full px-4 py-2 my-2 text-left rounded-sm ${aboutActiveTab === 'gamefi' ? 'bg-[#090909] text-white italic' : 'bg-gray-700 text-white hover:bg-gray-900'}`}
              onClick={() => setAboutActiveTab('gamefi')}
            >
              GameFi
            </button>
            <button
              className={`tab-button w-full px-4 py-2 my-2 text-left rounded-sm ${aboutActiveTab === 'memes' ? 'bg-[#090909] text-white italic' : 'bg-gray-700 text-white hover:bg-gray-900'}`}
              onClick={() => setAboutActiveTab('memes')}
            >
              Memes
            </button>
          </aside>
          <div className="flex-grow bg-[#090909] p-4 md:p-6 rounded-lg text-white">
            {aboutActiveTab === 'defi' && (
              <div className="glassmorphism-effect p-4 md:p-6 rounded-lg shadow-lg items-center flex flex-col">
                <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-4">DeFi Social Network</h3>
                <p className="text-gray-300 text-sm md:text-base">
                  MemeLinked&apos;s social network platform provides a space where users can engage, connect, and grow within the DeFi community. With interactive features and project spotlights, users experience an innovative approach to organic exposure and community-driven growth.
                </p>
                <Image
                  src="/images/ML3.png"
                  alt="DeFi Social Network"
                  className="mt-4 rounded-lg shadow-lg glassmorphism-effect animate-fade-in w-full max-w-md"
                  width={400}
                  height={250}
                />
              </div>
            )}
            {aboutActiveTab === 'gamefi' && (
              <div className="glassmorphism-effect p-4 md:p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-4">GameFi</h3>
                <p className="text-gray-300 text-sm md:text-base">
                  Our GameFi integration, highlighted by MonkeyKongRacing, delivers engaging and immersive experiences to the MSI ecosystem. This feature allows users to enjoy interactive gameplay while contributing to the community&apos;s overall value and entertainment.
                </p>
                <Image
                  src="/images/gamefi.png"
                  alt="GameFi"
                  className="mt-4 rounded-lg shadow-lg glassmorphism-effect animate-fade-in w-full max-w-md"
                  width={400}
                  height={250}
                />
              </div>
            )}
            {aboutActiveTab === 'memes' && (
              <div>
                <h3 className="text-2xl md:text-3xl mb-2">Celebrating Meme Culture</h3>
                <div className="carousel-container">
                  <Image src={selectedImage} alt="Meme Preview" width={400} height={400} className="w-full rounded-lg border border-yellow-500" />
                  <div className="gallery mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                    {images.map((image, index) => (
                      <div key={index} className="relative">
                        <Image
                          src={image}
                          alt={`Gallery Item ${index + 1}`}
                          className="w-full h-auto cursor-pointer rounded-lg hover:border-2 hover:border-yellow-500"
                          width={200}
                          height={200}
                          onClick={() => handleImageClick(image)}
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
{/* Tokenomics Section */}
<section className="tokenomics-section py-16 p-4 bg-[#e3af2c] text-white relative flex flex-col">
  <h2 className="text-4xl font-bold mb-4 text-white landing-heading">Tokenomics</h2>
  <div className="divider h-1 bg-[#090909] mb-8 mx-auto w-1/4"></div>
  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 justify-center self-center items-center">
    {/* Tokenomics Overview */}
    <div className="tokenomics-content space-y-6 flex flex-col order-2 lg:order-1">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Supply */}
        <div className="bg-[#090909] p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
          <h3 className="text-2xl font-semibold mb-2">Total Supply</h3>
          <p className="text-3xl font-bold text-yellow-500">1 Trillion</p>
          <p className="mt-2 text-sm text-gray-200">
            Strategically set to ensure a balanced ecosystem and sustainable growth.
          </p>
        </div>
        {/* Transaction Tax */}
        <div className="bg-[#090909] p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
          <h3 className="text-2xl font-semibold mb-2">Transaction Tax</h3>
          <p className="text-lg">
            <strong className="text-yellow-500">Buy:</strong> 0% 
            <br />
            <strong className="text-yellow-500">Transfer:</strong> 0% 
            <br />
            <strong className="text-yellow-500">Sell:</strong> 4%
          </p>
          <p className="mt-2 text-sm text-gray-200">
            The 4% sell tax is split evenly for marketing (2%) and development (2%) to support ongoing growth.
          </p>
        </div>
      </div>

      {/* Detailed Overview */}
      <div className="bg-[#090909] p-6 rounded-lg shadow-lg mt-6">
        <h3 className="text-2xl font-semibold mb-4">Detailed Tokenomics Overview</h3>
        <ul className="space-y-4 text-gray-300">
          <li>
            <strong className="text-yellow-500">1. Total Supply:</strong> 1 Trillion tokens designed for ecosystem sustainability and long-term development.
          </li>
          <li>
            <strong className="text-yellow-500">2. Transaction Tax:</strong> A 4% sell tax allocated to marketing (2%) and development (2%) ensures consistent growth and project support.
          </li>
        </ul>
      </div>
    </div>

    {/* Image Section */}
    <div className="relative flex justify-center items-center self-center order-1 lg:order-2">
      <div className="image-container w-full md:w-auto rounded-lg overflow-hidden shadow-2xl h-[80%] border-4 border-white border-opacity-50 bg-gradient-to-b from-transparent to-gray-900">
        <Image
          src="/images/ML1.webp"
          alt="Luxurious Shiba Inu"
          width={500}
          height={400}
          className="w-full h-auto md:max-w-none transition-opacity duration-500 ease-in-out hover:opacity-100 parallax-effect"
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
          from { opacity: .7; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  </div>
</section>


      {/* Roadmap Section */}
      <section className="roadmap-section py-16 p-2 bg-gradient-to-b from-[#e3af2c] via-black to-[#090909] text-white relativeflex flex-col">
  <div className="max-w-3xl mx-auto flex flex-col">
    <h2 className="text-4xl font-bold mb-8 text-center neon-text landing-heading" data-text="Roadmap">Roadmap</h2>
    <div className="roadmap-container relative">
      <div className="timeline absolute left-1/2 transform -translate-x-1/2 w-1 bg-yellow-500 h-full"></div>
      <ul className="space-y-12 flex items-center flex-col">
        {[
          {
            phase: 'Phase 1: Project Launch',
            description: 'Begin with the development and initial rollout of the MemeLinked project, featuring fundamental DeFi tools and interactive community engagement. Execute community onboarding campaigns and deploy essential utilities for staking and rewards.'
          },
          {
            phase: 'Phase 2: Platform Launch',
            description: 'Launch the full MemeLinked platform, complete with user accounts, project listings, and enhanced social interaction tools. Incorporate user feedback for continuous improvements and host activities like polls and member spotlights to encourage active participation.'
          },
          {
            phase: 'Phase 3: Marketing & Tier One Listings',
            description: 'Expand MemeLinked’s presence through targeted marketing campaigns and secure listings on top cryptocurrency exchanges. Promote the platform with influencer collaborations, social media campaigns, and AMA sessions to amplify community awareness.'
          },
          {
            phase: 'Phase 4: Feature Expansion and GameFi Introduction',
            description: 'Enhance user profiles and dashboards with advanced features. Introduce GameFi with MonkeyKongRacing for interactive gameplay that adds value to the ecosystem. Implement community challenges and reward systems to incentivize active participation and maintain user interest.'
          },
        ].map((item, index) => (
          <li
            key={index}
            className="relative animate-fade-in-up flex items-center"
            onMouseEnter={(e) => e.currentTarget.classList.add('scale-105')}
            onMouseLeave={(e) => e.currentTarget.classList.remove('scale-105')}
          >
            <div className="phase-marker w-24 h-12 flex items-center justify-center rounded-full shadow-md border border-yellow-500" style={{ background: 'rgba(255, 255, 255, 0.1)', boxShadow: '0 4px 8px rgba(255, 255, 255, 0.2)' }}>
              <span className="text-white font-bold">{index + 1}</span>
            </div>
            <div className="phase-card ml-6 p-6 bg-[#090909] bg-opacity-80 backdrop-blur-md border border-yellow-500 rounded-xl shadow-lg transform transition-transform duration-300">
              <h3 className="text-2xl font-semibold mb-2">{item.phase}</h3>
              <p className="text-lg">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
  {/* Image at the bottom left */}
  <div className="lg:absolute bottom-0 lg:bottom-4 lg:left-4">
    <Image
      src="/images/MK.png"
      alt="MemeLinked Graphic"
      className="w-48 h-48 rounded-lg shadow-lg bg-opacity-80 backdrop-blur-md"
      width={192}
      height={192}
    />
  </div>
</section>





      {/* Call-to-Action */}

      <section className="blog-doc-section bg-[#090909] text-white py-16 px-8">
  <div className="max-w-6xl mx-auto items-center flex flex-col">
    <h2 className="landing-heading text-4xl font-bold mb-4 text-center" data-text="Resources">
      Resources
    </h2>
    <div className="divider h-1 bg-yellow-500 mb-8 mx-auto w-1/4"></div>
    <div className="tabs-container flex justify-center mb-8">
      <button
        className={`tab-button px-6 py-2 mx-2 rounded-sm ${activeTab === 'blog' ? 'bg-white text-black' : 'bg-gray-700 text-white hover:bg-gray-900'}`}
        onClick={() => setActiveTab('blog')}
      >
        Blog
      </button>
      <button
        className={`tab-button px-6 py-2 mx-2 rounded-sm ${activeTab === 'documentation' ? 'bg-white text-black' : 'bg-gray-700 text-white hover:bg-gray-900'}`}
        onClick={() => setActiveTab('documentation')}
      >
        Documentation
      </button>
    </div>
    <div className="content-container p-6 bg-white text-black rounded-lg shadow-lg glassmorphism-effect animate-fade-in">
      {activeTab === 'blog' ? (
        <div>
          <h3 className="text-2xl font-semibold mb-4">Explore the Latest from MemeLinked</h3>
          <p className="mb-4">
            Dive into our blog to stay informed about the latest updates, trends, and insights into the world of MemeLinked. Discover how the community is thriving, find expert tips, and learn more about our ecosystem&apos;s innovations.
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-100 rounded-lg shadow-md">
              <h4 className="text-xl font-bold mb-2">How MemeLinked Integrates DeFi and Social Networking</h4>
              <p className="text-gray-700">Understand the unique approach that blends DeFi and social interactions...</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg shadow-md">
              <h4 className="text-xl font-bold mb-2">GameFi&apos;s Role in the MemeLinked Ecosystem</h4>
              <p className="text-gray-700">Explore how GameFi enhances user engagement and contributes to our growth...</p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-2xl font-semibold mb-4">Comprehensive Documentation</h3>
          <p className="mb-4">
            Access all the essential information, guides, and technical details you need to make the most out of MemeLinked&apos;s platform. From onboarding to advanced features, we have everything covered.
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-100 rounded-lg shadow-md">
              <h4 className="text-xl font-bold mb-2">Getting Started Guide</h4>
              <p className="text-gray-700">Step-by-step instructions to begin your journey with MemeLinked...</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg shadow-md">
              <h4 className="text-xl font-bold mb-2">API & Developer Tools</h4>
              <p className="text-gray-700">Detailed information on how to integrate with our platform and leverage its power...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
</section>

<section className="cta-section bg-[#090909] text-white py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4" >Join the Future of Community-Driven DeFi</h2>
          <button className="px-8 py-4 bg-yellow-500 text-black rounded-lg shadow hover:bg-yellow-600">
            Get Started
          </button>
        </div>
        
      </section>
    
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between">
        {/* Left Section - Logo and Subtitle */}
        <div className="mb-8 md:mb-0">
          <Image
            src="/images/LOGODARK.png" // Replace with your logo path
            alt="Logo"
            width={200}
            height={40}
            className="mb-2"
          />
          <p className="text-gray-400">Connecting Communities through Memes and DeFi.</p>
        </div>

        {/* Center Section - Links */}
        <div className="flex flex-col md:flex-row justify-between w-full md:w-2/3">
          {/* Menu Links */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-bold mb-2">Menu</h3>
            <ul>
              <li className="mb-1 hover:text-yellow-500">
                <Link href="/#home">Home</Link>
              </li>
              <li className="mb-1 hover:text-yellow-500">
                <Link href="/#about">About</Link>
              </li>
              <li className="mb-1 hover:text-yellow-500">
                <Link href="/#tokenomics">Tokenomics</Link>
              </li>
              <li className="mb-1 hover:text-yellow-500">
                <Link href="/#roadmap">Roadmap</Link>
              </li>
              <li className="mb-1 hover:text-yellow-500">
                <Link href="/#whitepaper">Whitepaper</Link>
              </li>
              <li className="mb-1 hover:text-yellow-500">
                <Link href="/#resources">Resources</Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-bold mb-2">Legal</h3>
            <ul>
              <li className="mb-1 hover:text-yellow-500">
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li className="mb-1 hover:text-yellow-500">
                <Link href="/terms-of-use">Terms of Use</Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-bold mb-2">Connect with Us</h3>
            <div className="flex space-x-4">
              <a href="https://t.me/your-telegram-link" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500">
                <FaTelegramPlane size={24} />
              </a>
              <a href="https://twitter.com/your-twitter-link" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500">
                <FaTwitter size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="mt-8 text-center text-gray-300 border-t border-[#ffbf00] pt-4">
        &copy; PabloCRO | 2024 | Powered by MSI
      </div>
    </footer>
  
    </LandingLayout>
  );
};

export default HomePage;