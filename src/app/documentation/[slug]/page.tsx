// src/app/documentation/[slug]/page.tsx
'use client'; // Indicate that this is a client-side component
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import React from 'react';

const docs = [
  {
    title: 'MemeLinked Platform Overview',
    href: 'platform-overview',
    content: (
      <>
        <section className="flex flex-col lg:ml-[25%] mt-[10vh] p-6 glassmorphism rounded-xl shadow-2xl backdrop-blur-lg">
          <h1 className="text-5xl font-extrabold mb-4 text-white">MemeLinked Platform Overview</h1>
          <div className="w-full h-[2px] bg-yellow-500 mb-6"></div>
          <Image
            src="/images/platform-overview.png"
            alt="MemeLinked Platform Overview"
            width={1000}
            height={400}
            className="rounded-lg shadow-lg transform hover:scale-105 my-10 transition-transform duration-500"
          />
          <p className="text-lg text-gray-200 mb-6">
            The MemeLinked platform combines decentralized finance (DeFi) with social networking to create a
            unique, collaborative ecosystem. This overview provides users with insights into the platform's core
            functionalities, its role in the DeFi space, and how it empowers users to engage with DeFi tools
            innovatively.
          </p>
          <h3 className="text-3xl font-semibold mb-4 text-white">Core Features:</h3>
          <ul className="list-disc ml-8 text-gray-200 text-lg space-y-2">
            <li><strong>Social Engagement:</strong> A vibrant community where DeFi discussions and networking thrive.</li>
            <li><strong>Portfolio Tools:</strong> Comprehensive tools for tracking and managing your DeFi investments.</li>
            <li><strong>Interactive Profiles:</strong> Showcase your expertise and build trust within the DeFi community.</li>
          </ul>
        </section>
      </>
    ),
  },
  {
    title: 'How to Navigate the MemeLinked dApp',
    href: 'navigate-dapp',
    content: (
      <>
        <section className="flex flex-col lg:ml-[25%] mt-[10vh] p-6 glassmorphism rounded-xl shadow-2xl backdrop-blur-lg">
          <h2 className="text-4xl font-bold mb-6 text-red-500">DETAILED DOCUMENTATION COMING SOON</h2>
          <h1 className="text-5xl font-extrabold mb-4 text-white">How to Navigate the MemeLinked dApp</h1>
          <div className="w-full h-[2px] bg-yellow-500 mb-6"></div>
          <Image
            src="/images/navigate-dapp.png"
            alt="Navigate the dApp"
            width={1000}
            height={400}
            className="rounded-lg shadow-lg transform hover:scale-105 my-10 transition-transform duration-500"
          />
          <p className="text-lg text-gray-200 mb-6">
            This section will soon provide comprehensive guidance on navigating the MemeLinked dApp, ensuring that users can make the most of its features for a seamless DeFi experience.
          </p>
        </section>
      </>
    ),
  },
  {
    title: 'Security and Best Practices in MemeLinked',
    href: 'security-best-practices',
    content: (
      <>
        <section className="flex flex-col lg:ml-[25%] mt-[10vh] p-6 glassmorphism rounded-xl shadow-2xl backdrop-blur-lg">
          <h1 className="text-5xl font-extrabold mb-4 text-white">Security and Best Practices in MemeLinked</h1>
          <div className="w-full h-[2px] bg-yellow-500 mb-6"></div>
          <Image
            src="/images/security-best-practices.png"
            alt="Security Best Practices"
            width={1000}
            height={400}
            className="rounded-lg shadow-lg transform hover:scale-105 my-10 transition-transform duration-500"
          />
          <p className="text-lg text-gray-200 mb-6">
            Understanding the importance of security and following best practices is crucial for ensuring a safe
            experience in the MemeLinked platform. This section details the strategies and guidelines for
            maintaining user safety while engaging in DeFi activities.
          </p>
          <h3 className="text-3xl font-semibold mb-4 text-white">Best Practices:</h3>
          <ul className="list-disc ml-8 text-gray-200 text-lg space-y-2">
            <li><strong>Secure Authentication:</strong> Utilize secure login methods and enable 2FA where available.</li>
            <li><strong>Portfolio Privacy:</strong> Ensure that your financial data remains private and secure.</li>
            <li><strong>Phishing Awareness:</strong> Stay vigilant against potential scams and fraudulent activities.</li>
          </ul>
        </section>
      </>
    ),
  }
  // Add more documentation entries as needed...
];

export default function DocumentationPage() {
  const params = useParams();
  const slug = params?.slug;

  const docContent = docs.find((doc) => doc.href.endsWith(slug));

  if (!docContent) {
    return notFound(); // Exit if no content found
  }

  return (
    <div className="p-4">
      {docContent.content}
    </div>
  );
}
