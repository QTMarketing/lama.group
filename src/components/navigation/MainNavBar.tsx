'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { LoginLink, SignupLink } from "@/components/AuthLinks";
import { usePathname, useSearchParams } from 'next/navigation';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import PartnershipDealerFormModal from "@/components/PartnershipDealerFormModal";
import PartnershipDealerForm from "@/components/PartnershipDealerForm";

// LaMa Logo Component
const LaMaLogo = () => (
  <svg className="w-32 h-8 sm:w-40 sm:h-10 md:w-48 md:h-12 lg:w-64 lg:h-14" viewBox="0 0 320 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="28" fontFamily="'Mont Book Regular', sans-serif" fontWeight="normal" fontSize="32" fill="#FF8800">LaMa</text>
    <text x="100" y="28" fontFamily="'Mont Book Regular', sans-serif" fontWeight="normal" fontSize="32" fill="#111">Group</text>
  </svg>
);

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Who We Are', href: '/who-we-are' },
  { name: 'Store Leasing', href: '/store-leasing' },
  { name: 'Blogs', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export function MainNavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isDealershipFormOpen, setIsDealershipFormOpen] = useState(false);
  const pathname = usePathname();
  const search = useSearchParams();
  const { data: session } = useSession();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDealershipFormClick = () => {
    setIsDealershipFormOpen(true);
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!isMounted) {
    return (
      <nav className="bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <div className="w-32 h-8 bg-gray-200 animate-pulse rounded"></div>
            </div>
            <div className="hidden lg:flex gap-8">
              {navLinks.map((link) => (
                <div key={link.name} className="w-20 h-6 bg-gray-200 animate-pulse rounded"></div>
              ))}
            </div>
            <div className="w-24 h-10 bg-gray-200 animate-pulse rounded-full"></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <div>
      <nav className="bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <LaMaLogo />
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || 
                  (link.href !== '/' && pathname?.startsWith(link.href)) ||
                  (link.href === '/' && pathname === '/');
                
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-gray-700 hover:text-[#111] transition-colors duration-200 font-medium py-2 ${
                      isActive ? 'text-[#111]' : ''
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Right side actions: Auth + Book A Session */}
            <div className="hidden lg:flex items-center gap-3">
              {(() => {
                const callbackUrl = `${pathname}${search?.toString() ? `?${search}` : ''}`;
                if (!session) {
                  return (
                    <>
                      <LoginLink className="rounded-full px-5 py-2 text-sm font-semibold text-white bg-[#111] hover:bg-black transition-colors">Login</LoginLink>
                      <SignupLink className="rounded-full px-5 py-2 text-sm font-semibold text-[#111] border border-gray-300 hover:border-gray-400 transition-colors">Sign Up</SignupLink>
                    </>
                  );
                }
                return (
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                      aria-label="User menu"
                    >
                      <User size={20} className="text-gray-700" />
                    </button>
                    
                    {/* Dropdown Menu */}
                    {isUserDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                        <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                          Hi, {session.user?.name ?? 'Member'}
                        </div>
                        <button
                          onClick={() => {
                            signOut();
                            setIsUserDropdownOpen(false);
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <LogOut size={16} className="mr-3" />
                          Log out
                        </button>
                      </div>
                    )}
                  </div>
                );
              })()}
              <button
                onClick={handleDealershipFormClick}
                className="rounded-full px-5 py-2 text-sm font-semibold text-white bg-[#FF8800] hover:bg-[#FF9900] transition-colors"
              >
                Dealership Form
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-[#111] transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
          <div className="px-4 py-6 space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || 
                (link.href !== '/' && pathname?.startsWith(link.href)) ||
                (link.href === '/' && pathname === '/');
              
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block text-base font-medium py-3 px-2 rounded-md transition-colors ${
                    isActive 
                      ? 'text-[#111] bg-gray-50' 
                      : 'text-gray-700 hover:text-[#111] hover:bg-gray-50'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.name}
                </Link>
              );
            })}
            {/* Mobile Auth + Book A Session */}
            <div className="pt-2 space-y-3">
              {(() => {
                const callbackUrl = `${pathname}${search?.toString() ? `?${search}` : ''}`;
                if (!session) {
                  return (
                    <div className="grid grid-cols-2 gap-2">
                      <LoginLink className="col-span-1 text-center rounded-full px-5 py-3 text-sm font-semibold text-white bg-[#111] hover:bg-black transition-colors">Login</LoginLink>
                      <SignupLink className="col-span-1 text-center rounded-full px-5 py-3 text-sm font-semibold text-[#111] border border-gray-300 hover:border-gray-400 transition-colors">Sign Up</SignupLink>
                    </div>
                  );
                }
                return (
                  <div className="space-y-2">
                    <div className="text-sm text-gray-700 text-center">Hi, {session.user?.name ?? 'Member'}</div>
                    <button 
                      onClick={() => { 
                        signOut(); 
                        setIsMobileMenuOpen(false); 
                      }} 
                      className="flex items-center justify-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors rounded-md"
                    >
                      <LogOut size={16} className="mr-2" />
                      Log out
                    </button>
                  </div>
                );
              })()}
              <button
                onClick={() => {
                  handleDealershipFormClick();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full rounded-full px-5 py-3 text-sm font-semibold text-white bg-[#FF8800] hover:bg-[#FF9900] transition-colors"
              >
                Dealership Form
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Partnership Dealer Form Modal */}
      <PartnershipDealerFormModal
        isOpen={isDealershipFormOpen}
        onClose={() => setIsDealershipFormOpen(false)}
        sourceUrl="/store-leasing"
        formSelector="#partnership-dealer-opportunities-form"
        title="Partnership Dealer Opportunities Form"
        reactContent={<PartnershipDealerForm inline />}
      />
    </div>
  );
} 