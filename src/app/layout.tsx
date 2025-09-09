import type { Metadata } from "next";
import "./globals.css";
import { TopNavBar } from "@/components/navigation/TopNavBar";
import { MainNavBar } from "@/components/navigation/MainNavBar";
import { Footer } from "@/components/navigation/Footer";
import Providers from "./providers";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "LaMa Group - Modern Corporate Solutions",
  description: "LaMa Group provides innovative business solutions including fuel management, wholesale services, and corporate consulting.",
  icons: {
    icon: '/lamagrouplogo.svg',
    shortcut: '/lamagrouplogo.svg',
    apple: '/lamagrouplogo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-[#111] antialiased">
        <Providers>
          <div className="min-h-screen flex flex-col bg-white">
            {/* Top Navigation Bar */}
            <TopNavBar />

            {/* Main Navigation Bar */}
            <Suspense fallback={<div className="h-16 bg-white border-b border-gray-200" />}>
              <MainNavBar />
            </Suspense>

            {/* Page Content */}
            <main className="flex-1">
              {children}
            </main>

            {/* Footer */}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
