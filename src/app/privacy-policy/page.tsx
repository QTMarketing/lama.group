"use client";
import React from "react";
import { Button } from "../../components/ui/button";
// import { useInView } from "../../hooks/useInView";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import Footer from "../../components/Footer";

// Simple LaMa Group Logo as SVG
const LaMaLogo = () => (
  <svg className="w-40 h-8 sm:w-48 sm:h-10 md:w-56 md:h-12" viewBox="0 0 220 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="28" fontFamily="'Inter', sans-serif" fontWeight="bold" fontSize="32" fill="#FF8800">LaMa</text>
    <text x="110" y="28" fontFamily="'Inter', sans-serif" fontWeight="bold" fontSize="32" fill="#111">Group</text>
  </svg>
);

const navLinks = [
  { label: "About", href: "/" },
  { label: "Who We Are", href: "/", dropdown: ["Leadership", "Mission", "History"] },
  { label: "Services", href: "/", dropdown: ["QuickTrack Inc", "QuickTrack Fuel", "Buy, Sell & Lease", "LaMa Wholesale"] },
  { label: "Supplier Partners", href: "/" },
  { label: "Debt Investors", href: "/" },
];

const topLinks = [
  { label: "QuickTrack Inc", href: "https://quicktrackinc.com/" },
  { label: "QuickTrack Fuel", href: "https://www.quicktrackfuel.com/" },
  { label: "LaMa Wholesale", href: "https://www.lamawholesale.com/" },
];

export default function PrivacyPolicy() {
  // const [navRef, navInView] = useInView({ threshold: 0.1 }, false) as [React.RefObject<HTMLDivElement>, boolean];

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Announcement Bar */}
      <div className="w-full bg-black text-white text-xs sm:text-sm text-center py-2 px-2 sm:px-4">
        Join LaMa Group in Supporting Children&apos;s Miracle Network Hospitals
      </div>

      {/* Top Navigation Links */}
      <div className="w-full bg-white border-b flex flex-col sm:flex-row justify-between items-center px-2 sm:px-4 md:px-12 py-2 gap-y-2">
        <div className="flex flex-wrap gap-x-4 sm:gap-x-6 text-black text-sm font-medium justify-center">
          {topLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:underline"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="w-full bg-white flex flex-col md:flex-row items-center justify-between px-2 sm:px-4 md:px-12 py-4 shadow-sm z-10">
        <div className="flex items-center gap-2 sm:gap-4 md:gap-8 px-0 md:px-0">
          <LaMaLogo />
        </div>
        <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-center mt-2 md:mt-0">
          <ul className="flex flex-col md:flex-row gap-y-2 md:gap-y-0 md:space-x-6 items-center">
            {navLinks.map((link) => (
              <li key={link.label} className="relative group">
                <a href={link.href} className="font-semibold text-black px-2 py-1 hover:text-orange-500 transition-colors flex items-center">
                  {link.label}
                  {link.dropdown && (
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  )}
                </a>
                {/* Dropdown */}
                {link.dropdown && (
                  <>
                    {/* Invisible hover area to prevent dropdown from disappearing */}
                    <div className="absolute left-0 top-full w-40 h-2 bg-transparent opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto"></div>
                    <ul className="absolute left-0 top-full mt-2 w-40 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 z-20 group-hover:delay-150">
                      {link.dropdown.map((item) => (
                        <li key={item} className="group/item">
                          {link.label === "Services" ? (
                            item === "QuickTrack Inc" ? (
                              <a href="https://quicktrackinc.com/" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 group-hover/item:bg-gray-100">{item}</a>
                            ) : item === "QuickTrack Fuel" ? (
                              <a href="https://www.quicktrackfuel.com/" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 group-hover/item:bg-gray-100">{item}</a>
                            ) : item === "LaMa Wholesale" ? (
                              <a href="https://www.lamawholesale.com/" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 group-hover/item:bg-gray-100">{item}</a>
                            ) : (
                              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 group-hover/item:bg-gray-100">{item}</a>
                            )
                          ) : (
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 group-hover/item:bg-gray-100">{item}</a>
                          )}
                        </li>
                      ))}
                    </ul>
                    </>
                  )}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-2 md:mt-0">
          <Button className="bg-[#FF6600] hover:bg-orange-700 text-white font-semibold rounded-full px-4 sm:px-6 py-2 shadow-md text-sm sm:text-base">Contact Us</Button>
        </div>
      </nav>

      {/* Page Content */}
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">Last updated: January 2025</p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
              <p className="text-gray-700 mb-4">
                LaMa Group collects information that you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This may include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Name and contact information</li>
                <li>Payment and billing information</li>
                <li>Account credentials</li>
                <li>Communications with us</li>
                <li>Information about your business or organization</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices, updates, security alerts, and support messages</li>
                <li>Respond to your comments, questions, and customer service requests</li>
                <li>Communicate with you about products, services, offers, and events</li>
                <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information Sharing</h2>
              <p className="text-gray-700 mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share your information in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>With your consent or at your direction</li>
                <li>With service providers who perform services on our behalf</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and safety</li>
                <li>In connection with a business transfer or merger</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Your Rights and Choices</h2>
              <p className="text-gray-700 mb-4">
                You have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>The right to access and receive a copy of your personal information</li>
                <li>The right to rectify or update your personal information</li>
                <li>The right to delete your personal information</li>
                <li>The right to restrict or object to processing</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 mb-4">
                We use cookies and similar tracking technologies to collect information about your browsing activities and to understand and save your preferences for future visits. You can control cookies through your browser settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Children&apos;s Privacy</h2>
              <p className="text-gray-700 mb-4">
                Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Changes to This Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this privacy policy or our data practices, please contact us at privacy@lamagroup.com.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 