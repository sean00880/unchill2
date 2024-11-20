"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import DocumentationLayout from "../components/DocumentationLayout";
import DocumentationLayout2 from "../components/DocumentationLayout2";
import DefaultLayout from "../components/DefaultLayout";

type PathCheckerProps = {
  children: React.ReactNode;
  posts: { title: string; href: string }[];
};

const PathChecker: React.FC<PathCheckerProps> = ({ children, posts }) => {
  const pathname = usePathname();

  const isLandingPage = pathname === '/';
  const isDocumentationPage = pathname.startsWith('/docs');
  const isBlogPage = pathname.startsWith('/blog');

  if (isLandingPage) {
    return <>{children}</>;
  } else if (isDocumentationPage) {
    return <DocumentationLayout2 posts={posts}>{children}</DocumentationLayout2>;
  } else if (isBlogPage) {
    return <DocumentationLayout posts={posts}>{children}</DocumentationLayout>;
  } else {
    return <DefaultLayout>{children}</DefaultLayout>;
  }
};

export default PathChecker;
