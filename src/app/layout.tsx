"use client";
import React from 'react';
import { Provider } from 'urql';
import { client } from '../lib/urql'; // Update the import path if necessary
import localFont from 'next/font/local';
import "./globals.css";
import { usePathname } from 'next/navigation';
import DefaultLayout from "../components/DefaultLayout"; // Main default layout
import DocumentationLayout from "../components/DocumentationLayout"; // Layout for blog and documentation

// Define local fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Define the posts array for blog/documentation pages
const posts = [
  { title: 'How MemeLinked Integrates DeFi and Social Networking', href: '/blog/defi-social-networking' },
  { title: 'GameFi’s Role in the MemeLinked Ecosystem', href: '/blog/gamefi-role' },
  { title: 'The Future of Meme-Driven Finance', href: '/blog/meme-finance-future' },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Check if the current route is for the landing page, blog, or documentation
  const isLandingPage = pathname === '/';
  const isDocumentationPage = pathname.startsWith('/documentation');
  const isBlogPage = pathname.startsWith('/blog');

  return (
    <Provider value={client}>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
          {isLandingPage ? (
            children
          ) : isDocumentationPage ? (
            <DocumentationLayout posts={posts}>{children}</DocumentationLayout>
          ) : isDocumentationPage ? (
            <DocumentationLayout posts={posts}>{children}</DocumentationLayout>
          ) : (
            <DefaultLayout>{children}</DefaultLayout>
          )}
        </body>
        
      </html>
    </Provider>
  );
}
