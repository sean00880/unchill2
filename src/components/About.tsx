"use client";
import React, { useState } from 'react';
import Image from 'next/image';

interface AboutSectionProps {
  images: string[];
}

const AboutSection: React.FC<AboutSectionProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0] || '/images/default_logo.png');
  const [aboutActiveTab, setAboutActiveTab] = useState('defi');

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  return (
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
        <div className="flex flex-col md:flex-row mt-8 gap-6">
          {/* Left Container for Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <Image
              src="/images/ML3.png"
              alt="DeFi Social Network"
              className="rounded-lg shadow-lg glassmorphism-effect animate-fade-in"
              width={500}
              height={400}
            />
          </div>

          {/* Right Container for Animated Pentagon */}
          <div className="w-full md:w-1/2 relative flex justify-center items-center">
            <div className="relative w-[300px] h-[300px] flex items-center justify-center">
              {/* Central Laptop Image */}
              <Image
                src="/images/default_logo.jpg"
                alt="Laptop Displaying App"
                className="absolute w-[150px] h-[100px] animate-pulse"
                width={150}
                height={100}
              />

              {/* Pentagon with Fading Icons */}
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className={`absolute w-[40px] h-[40px] rounded-full animate-fade-in-${index + 1} transition-opacity`}
                  style={{
                    transform: `rotate(${72 * index}deg) translate(120px) rotate(-${72 * index}deg)`,
                    opacity: 0.8,
                  }}
                >
                  <Image
                    src={`/images/icon${index + 1}.png`}
                    alt={`Icon ${index + 1}`}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content for Tabs */}
        <div className="flex mt-8">
          <aside className="flex-none w-full md:w-48 mb-4 md:mb-0 md:mr-4">
            <button
              className={`tab-button w-full px-4 py-2 my-2 rounded-sm text-left ${
                aboutActiveTab === 'defi' ? 'bg-[#090909] italic text-white' : 'bg-gray-700 text-white hover:bg-gray-900'
              }`}
              onClick={() => setAboutActiveTab('defi')}
            >
              DeFi Social Network
            </button>
            <button
              className={`tab-button w-full px-4 py-2 my-2 text-left rounded-sm ${
                aboutActiveTab === 'gamefi' ? 'bg-[#090909] text-white italic' : 'bg-gray-700 text-white hover:bg-gray-900'
              }`}
              onClick={() => setAboutActiveTab('gamefi')}
            >
              GameFi
            </button>
            <button
              className={`tab-button w-full px-4 py-2 my-2 text-left rounded-sm ${
                aboutActiveTab === 'memes' ? 'bg-[#090909] text-white italic' : 'bg-gray-700 text-white hover:bg-gray-900'
              }`}
              onClick={() => setAboutActiveTab('memes')}
            >
              Memes
            </button>
          </aside>
          <div className="flex-grow bg-[#090909] p-4 md:p-6 rounded-lg text-white">
          {aboutActiveTab === 'defi' && (
                <div className="relative bg-[#090909] p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                <h3 className="text-3xl font-bold text-yellow-500 mb-4">DeFi Social Network</h3>
                <p className="text-gray-300">
                  MemeLinked's social network platform provides a space where users can engage, connect, and grow within the DeFi community. With interactive features and project spotlights, users experience an innovative approach to organic exposure and community-driven growth.
                </p>
                <Image
                  src="/images/ML1.jpg"
                  alt="DeFi Social Network"
                  className="mt-4 rounded-lg shadow-lg glassmorphism-effect animate-fade-in"
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
  );
};

export default AboutSection;
