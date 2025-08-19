'use client';

import { ReactNode } from 'react';
import { TopNavBar } from '@/components/navigation/TopNavBar';
import { QuickLinksBar } from '@/components/navigation/QuickLinksBar';
import { MainNavBar } from '@/components/navigation/MainNavBar';
import { Footer } from '@/components/navigation/Footer';

interface PageTemplateProps {
  children: ReactNode;
  className?: string;
}

export function PageTemplate({ children, className = "min-h-screen bg-white" }: PageTemplateProps) {
  return (
    <div className={className}>
      {/* Top Navigation Bar */}
      <TopNavBar />
      
      {/* Quick Links Bar */}
      <QuickLinksBar />
      
      {/* Main Navigation Bar */}
      <MainNavBar />
      
      {/* Page Content */}
      <main>
        {children}
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
} 