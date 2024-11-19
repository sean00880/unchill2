"use client";
import React, { useEffect, useState } from 'react';
import { Provider } from 'urql';
import { client } from '../lib/urql'; // Update the import path if necessary
import localFont from 'next/font/local';
import "./globals.css";
import { usePathname } from 'next/navigation';
import DefaultLayout from "../components/DefaultLayout"; // Main default layout
import DocumentationLayout from "../components/DocumentationLayout"; // Layout for blog and documentation
import DocumentationLayout2 from "../components/DocumentationLayout2"; 
import { AuthProvider, useAuthContext } from '../context/AuthContext'; // Import AuthProvider and useAuthContext

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
  const [user, setUser] = useState(null);
  
  // Check if the current route is for the landing page, blog, or documentation
  const isLandingPage = pathname === '/';
  const isDocumentationPage = pathname.startsWith('/docs');
  const isBlogPage = pathname.startsWith('/blog');

  // Fetch dynamic user data if not on the landing, blog, or documentation pages
  useEffect(() => {
    if (!isLandingPage && !isDocumentationPage && !isBlogPage) {
      // Simulate fetching user data
      setUser({
        name: 'John Doe',
        role: 'Developer',
        preferences: { theme: 'dark' },
      });
    }
  }, [pathname]);

  return (
    <AuthProvider>
      <Provider value={client}>
        <html lang="en">
          <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
            {isLandingPage ? (
              children
            ) : isDocumentationPage ? (
              <DocumentationLayout2 posts={posts}>{children}</DocumentationLayout2>
            ) : isBlogPage ? (
              <DocumentationLayout posts={posts}>{children}</DocumentationLayout>
            ) : (
              <DefaultLayout user={user}>{children}</DefaultLayout>
            )}
          </body>
        </html>
      </Provider>
    </AuthProvider>
  );
}
