"use client";
// src/app/page.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import LandingLayout from '../components/LandingLayout';
import Link from 'next/link';
import Footer from '../components/Footer';
import AboutSection from '../components/About';

const posts = [
  {
    title: 'How MemeLinked Integrates DeFi and Social Networking',
    href: '/blog/defi-social-networking',
    description: 'Understand the unique approach that blends DeFi and social interactions...',
    previewImage: '/images/ML2.webp',
  },
  {
    title: "GameFi's Role in the MemeLinked Ecosystem",
    href: '/blog/gamefi-role',
    description: 'Explore how GameFi enhances user engagement and contributes to our growth...',
    previewImage: '/images/ML6.png',
  },
  // Add more blog posts with preview images here
];

const HomePage: React.FC = () => {
  

  const [activeTab, setActiveTab] = useState('blog'); // This is for the Blog/Documentation section
  const images = [
    '/images/ML4.png',
    '/images/ML5.png',
    '/images/default_logo.png',
    '/images/default_logo.png',
    '/images/default_logo.png',
  ];



  return (
    <LandingLayout>
      {/* Hero Section */}
      <section className="hero-section flex flex-col items-center justify-center min-h-screen bg-cover bg-center relative">
      <div className="absolute inset-0 bg-[#090909] bg-opacity-50"></div>
      <div className="z-10 text-center flex flex-col items-center text-white p-6">
        <Image src="/images/default_logo.jpg" width={200} height={200} alt="MemeLinked Logo" className="w-32 rounded-full h-32 mb-4" />
        <h1 className="text-5xl font-extrabold mb-2">
          <span className="meme animate-glitch">Meme</span>
          <span className="animate-glitch2">LINKED</span>
        </h1>
        <p className="text-lg mb-6">
          A DeFi project on Ethereum, part of the Monkey Shit Inu ecosystem, where memes meet Social Media.
        </p>
        <div className="bg-yellow-500 text-black px-4 py-2 rounded-md mb-2 hover:bg-yellow-600 cursor-pointer">
          Official Contract Address: <span className="font-mono">0xMemeLinkedContractAddress</span>
        </div>
         {/*
        <button className="px-6 py-3 bg-yellow-500 text-black rounded-lg shadow hover:bg-yellow-600">
          Connect Wallet
        </button>*/}

        {/* Social Icons Section */}
        <div className="mt-6 bg-black/50 backdrop-blur-lg socials-container p-4 rounded-xl shadow-lg flex justify-center space-x-4">
         <Link href="https://x.com/MemeLinked"> <Image src="/icons/x.png" width={50} height={50} alt="MemeLinked X Profile" className="socials border-2 border-white cover rounded-full" /></Link>
          <Image src="/icons/telegram.png" width={50} height={50} alt="MemeLinked Telegram Profile" className="socials border-2 border-white cover rounded-full" />
          <Image src="/icons/dextools.png" width={50} height={50} alt="MemeLinked DexTools Profile" className="socials border-2 border-white cover rounded-full" />
          <Image src="/icons/dexscreener.png" width={50} height={50} alt="MemeLinked DexScreener Profile" className="socials border-2 border-white cover rounded-full" />
          <Image src="/icons/linktree.png" width={50} height={50} alt="MemeLinked LinkTree Profile" className="socials border-2 border-white bg-white cover rounded-full" />
          <Image src="/icons/TickerTrending.jpg" width={50} height={50} alt="MemeLinked DexScreener Profile" className="socials border-2 border-white cover rounded-full" />
        </div>
      </div>
    </section>

      {/* About Section */}
      <AboutSection images={images} />
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
          <p className="text-3xl font-bold text-yellow-500">1 Trillion</p><span>$MK</span>
          <p className="mt-2 text-sm text-gray-200">
            Strategically set to ensure a balanced ecosystem and sustainable growth.
          </p>
          <Image
          src="/images/ML.gif"
          alt="Luxurious Shiba Inu"
          width={300}
          height={300}
          className="w-full h-auto md:max-w-none transition-opacity duration-500 ease-in-out hover:opacity-100 parallax-effect"
        />
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
            The 4% sell tax is split evenly for marketing (2%) and development (2%) to support ongoing growth of the <Link href="https://monkeyshitinu.com"><span className='MSI'>MSI</span> (<span className='MonkeyShitInu'>Monkey Shit Inu</span>)</Link> ecosystem.
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
      <div className="image-container w-full md:w-auto rounded-lg overflow-hidden h-[80%] ">
        <Image
          src="/images/ML.gif"
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
            description: 'Begin with the development and initial rollout of the MemeLinked project, featuring fundamental DeFi tools and interactive community engagement. Execute community onboarding campaigns and deploy essential utilities around community exploration and growth in Defi.'
          },
          {
            phase: 'Phase 2: Marketing & Centralized Exchanges',
            description: 'Expand MemeLinked’s presence through targeted marketing campaigns and secure listings on top cryptocurrency exchanges. Promote the platform with influencer collaborations, social media campaigns, and AMA sessions to amplify community awareness.'
          }
          ,
          {
            phase: 'Phase 3: Platform Launch',
            description: 'Launch the full MemeLinked platform, complete with user accounts, project listings, and enhanced social interaction tools. Incorporate user feedback for continuous improvements and host activities like polls and member spotlights to encourage active participation.'
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
                <h3 className="text-yellow-500 font-semibold mb-4">Explore the Latest from MemeLinked</h3>
                <p className="mb-4 text-white">
                  Dive into our blog to stay informed about the latest updates, trends, and insights into the world of MemeLinked...
                </p>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {posts.map((post, index) => (
                    <div key={index} className="p-4 bg-gray-100 flex flex-col items-center justify-center rounded-lg shadow-md">
                      <Link href={post.href}>
                        <div className="flex flex-col items-center self-center justify-center">
                          <Image
                            src={post.previewImage}
                            alt={`${post.title} preview`}
                            width={400}
                            height={250}
                            className="rounded-md mb-3"
                          />
                          <h4 className="text-xl font-bold mb-2">{post.title}</h4>
                        </div>
                      </Link>
                      <p className="text-gray-700">{post.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
          <h3 className="text-2xl font-semibold mb-4 text-yellow-500">Comprehensive Documentation</h3>
          <p className="mb-4 text-white">
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
    
  <Footer/>
  
    </LandingLayout>
  );
};

export default HomePage;