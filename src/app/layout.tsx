// src/app/layout.tsx
"use client";
import React from 'react';
import { Provider } from 'urql';
import { client } from '../lib/urql'; // Update the import path if necessary
import localFont from 'next/font/local';
import "./globals.css";
import { usePathname } from 'next/navigation';
import DefaultLayout from "../components/DefaultLayout"; // Renamed for clarity

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Check if the current route is the root (landing page)
  const isLandingPage = pathname === '/';

  return (
    <Provider value={client}>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
          {isLandingPage ? children : <DefaultLayout>{children}</DefaultLayout>}
        </body>
      </html>
    </Provider>
  );
}
