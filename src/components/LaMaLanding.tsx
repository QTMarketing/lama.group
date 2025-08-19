"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import AOS from 'aos';
import 'aos/dist/aos.css';
import HeroSection from "./HeroSection";
import { TopNavBar } from "./navigation/TopNavBar";
import { QuickLinksBar } from "./navigation/QuickLinksBar";
import { MainNavBar } from "./navigation/MainNavBar";
import { Footer } from "./navigation/Footer";

// VERCEL DEPLOYMENT FIX: This file contains all TypeScript fixes applied
// Fixed onToggleMode prop destructuring - commit eac9fc9
type AuthMode = 'login' | 'signup';

interface AuthModalProps {
  open: boolean;
  mode: AuthMode;
  onClose: () => void;
  onSubmit: (email: string, password: string, mode: AuthMode) => void;
  onToggleMode: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ open, mode, onClose, onSubmit, onToggleMode }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);

  if (!open) return null;

  const handleSubmit = () => {
    if (mode === 'signup' && !acceptTerms) {
      alert('Please accept the terms and privacy policy');
      return;
    }
    onSubmit(email, password, mode);
  };

  const handleToggleMode = () => {
    onClose();
    // Small delay to allow modal to close before opening in new mode
    setTimeout(() => {
      onToggleMode();
    }, 150);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl animate-rise-in">
        {/* Close Button */}
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 h-8 w-8 rounded-full text-gray-500 hover:bg-gray-100 flex items-center justify-center transition-colors"
        >
          ×
        </button>

        {/* Title */}
        <h1 className="text-2xl font-mont-bold text-center text-gray-900 mb-8">
          {mode === 'login' ? 'Welcome Back' : 'Create Account'}
        </h1>

        {/* Form */}
        <div className="space-y-4">
          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="auth-email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="auth-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full h-12 rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#007BFF] focus:border-[#007BFF] transition-all"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="auth-password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                id="auth-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full h-12 rounded-lg border border-gray-300 px-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[#007BFF] focus:border-[#007BFF] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          {/* Terms and Privacy Policy (Signup only) */}
          {mode === 'signup' && (
            <div className="flex items-start space-x-3">
              <input
                id="accept-terms"
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="mt-1 h-4 w-4 text-[#007BFF] focus:ring-[#007BFF] border-gray-300 rounded"
              />
              <label htmlFor="accept-terms" className="text-sm text-gray-600">
                I agree to the{" "}
                <a href="/terms" className="text-[#007BFF] hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy-policy" className="text-[#007BFF] hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>
          )}

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            className="w-full h-12 bg-[#007BFF] hover:bg-[#0056CC] text-white font-semibold rounded-lg transition-colors"
          >
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </Button>
        </div>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3">
          {/* Facebook */}
          <button className="w-full h-12 bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-3">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span>Continue with Facebook</span>
          </button>

          {/* Google */}
          <button className="w-full h-12 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg font-medium transition-colors flex items-center justify-center space-x-3">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Apple */}
          <button className="w-full h-12 bg-black hover:bg-gray-800 text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-3">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <span>Continue with Apple</span>
          </button>
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            {mode === 'login' ? (
              <>
                Don&apos;t have an account?{' '}
                <button onClick={handleToggleMode} className="text-[#007BFF] hover:underline font-medium">
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button onClick={handleToggleMode} className="text-[#007BFF] hover:underline font-medium">
                  Log in
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function LaMaLanding() {
  const [authOpen, setAuthOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Navigation Bar */}
      <TopNavBar />

      {/* Quick Links Bar */}
      <QuickLinksBar />

      {/* Main Navigation Bar */}
      <MainNavBar />

      {/* Hero Section */}
      <HeroSection />

      {/* Auth Modal */}
      <AuthModal
        open={authOpen}
        mode={authMode}
        onClose={() => setAuthOpen(false)}
        onSubmit={(email, password, mode) => {
          // Placeholder submit handler
          console.log(mode === 'login' ? 'Login' : 'Sign Up', { email, password });
          setAuthOpen(false);
        }}
        onToggleMode={() => {
          setAuthMode(authMode === 'login' ? 'signup' : 'login');
          setAuthOpen(true);
        }}
      />

      {/* Services Section */}
      <section className="bg-white text-black py-20">
        <div className="max-w-[1200px] mx-auto px-6 aos-init aos-animate" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">Services</h2>
          
          {/* First Row - 3 Services */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-8">
            {/* Store Leasing & Management */}
            <div className="mx-4 my-6 w-[380px] md:w-[400px] h-[600px] md:h-[620px] bg-white rounded-xl p-8 flex flex-col items-center justify-between">
              <div className="w-[312px] h-[500px] bg-gray-300 rounded-lg flex items-center justify-center mb-6">
                <span className="text-gray-600 text-lg font-medium">Store Leasing & Management Image</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Store Leasing & Management</h3>
              <p className="text-gray-700 mb-6 leading-relaxed text-center">
                Comprehensive store leasing and management solutions for convenience stores and gas stations. 
                Expert guidance through every step of the process.
              </p>
              <div className="flex w-full justify-center mt-6">
                <a href="/store-leasing" className="inline-block bg-[#FF6600] text-white font-medium text-base px-6 py-2 rounded-full hover:bg-orange-600 transition-colors">Learn More</a>
              </div>
            </div>

            {/* Wholesale Distribution */}
            <div className="mx-4 my-6 w-[380px] md:w-[400px] h-[600px] md:h-[620px] bg-white rounded-xl p-8 flex flex-col items-center justify-between">
              <div className="w-[312px] h-[500px] bg-gray-300 rounded-lg flex items-center justify-center mb-6">
                <span className="text-gray-600 text-lg font-medium">Wholesale Distribution Image</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Wholesale Distribution</h3>
              <p className="text-gray-700 mb-6 leading-relaxed text-center">
                Advanced wholesale distribution and supply chain solutions that power our network and beyond. 
                Secure, reliable, and innovative solutions for business partners.
              </p>
              <div className="flex w-full justify-center mt-6">
                <a href="#" className="inline-block bg-[#FF6600] text-white font-medium text-base px-6 py-2 rounded-full hover:bg-orange-600 transition-colors">Learn More</a>
              </div>
            </div>

            {/* Fuel Branding & Supply */}
            <div className="mx-4 my-6 w-[380px] md:w-[400px] h-[600px] md:h-[620px] bg-white rounded-xl p-8 flex flex-col items-center justify-between">
              <div className="w-[312px] h-[500px] bg-gray-300 rounded-lg flex items-center justify-center mb-6">
                <span className="text-gray-600 text-lg font-medium">Fuel Branding & Supply Image</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Fuel Branding & Supply</h3>
              <p className="text-gray-700 mb-6 leading-relaxed text-center">
                Premium fuel branding and supply solutions. Partner with trusted brands and ensure reliable 
                fuel supply for your convenience store operations.
              </p>
              <div className="flex w-full justify-center mt-6">
                <a href="#" className="inline-block bg-[#FF6600] text-white font-medium text-base px-6 py-2 rounded-full hover:bg-orange-600 transition-colors">Learn More</a>
              </div>
            </div>
          </div>

          {/* Second Row - 2 Services */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              {/* Construction & Renovation */}
              <div className="mx-4 my-6 w-[380px] md:w-[400px] h-[600px] md:h-[620px] bg-white rounded-xl p-8 flex flex-col items-center justify-between">
                <div className="w-[312px] h-[500px] bg-gray-300 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-gray-600 text-lg font-medium">Construction & Renovation Image</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Construction & Renovation</h3>
                <p className="text-gray-700 mb-6 leading-relaxed text-center">
                  Professional construction and renovation services for convenience stores and gas stations. 
                  From concept to completion, we handle every detail.
                </p>
                <div className="flex w-full justify-center mt-6">
                  <a href="#" className="inline-block bg-[#FF6600] text-white font-medium text-base px-6 py-2 rounded-full hover:bg-orange-600 transition-colors">Learn More</a>
                </div>
              </div>

              {/* Maintenance & Support */}
              <div className="mx-4 my-6 w-[380px] md:w-[400px] h-[600px] md:h-[620px] bg-white rounded-xl p-8 flex flex-col items-center justify-between">
                <div className="w-[312px] h-[500px] bg-gray-300 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-gray-600 text-lg font-medium">Maintenance & Support Image</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Maintenance & Support</h3>
                <p className="text-gray-700 mb-6 leading-relaxed text-center">
                  Ongoing maintenance and support services to keep your operations running smoothly. 
                  We&apos;re here when you need us, ensuring minimal downtime and maximum efficiency.
                </p>
                <div className="flex w-full justify-center mt-6">
                  <a href="#" className="inline-block bg-[#FF6600] text-white font-medium text-base px-6 py-2 rounded-full hover:bg-orange-600 transition-colors">Learn More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why LaMa Section */}
      <section className="bg-gradient-to-r from-white via-orange-50 to-white text-black py-24">
        <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start aos-init aos-animate" data-aos="fade-up">
          {/* Left Column */}
          <div>
            <h2 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Why <span className="text-[#FF6600]">LaMa</span> Group is the Right Choice for You
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">For years, we&apos;ve been committed to delivering quality, value, and service that exceeds expectations for convenience store owners across Texas.</p>
            <div className="flex flex-wrap gap-5">
              <a href="tel:+1XXXYYYZZZZ" className="text-orange-500 font-semibold text-decoration-none hover:text-orange-600 transition-colors">Call Now →</a>
              <a href="/estimate" className="text-orange-500 font-semibold text-decoration-none hover:text-orange-600 transition-colors">Learn More →</a>
            </div>
          </div>
          
          {/* Right Column: Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Comprehensive Support */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:scale-105 transition-transform duration-300 flex flex-col">
              <div className="text-3xl mb-4">🛠️</div>
              <h3 className="text-xl font-bold mb-3 text-black">Comprehensive Support</h3>
              <p className="text-gray-600 text-sm leading-relaxed">From planning to execution, we provide full-service support tailored to your goals. You&apos;re never alone in your journey.</p>
            </div>
            
            {/* Industry Expertise */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:scale-105 transition-transform duration-300 flex flex-col">
              <div className="text-3xl mb-4">🧠</div>
              <h3 className="text-xl font-bold mb-3 text-black">Industry Expertise</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Our team brings years of hands-on experience across multiple sectors. We know what works—and how to deliver it.</p>
            </div>
            
            {/* Local Knowledge */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:scale-105 transition-transform duration-300 flex flex-col">
              <div className="text-3xl mb-4">📍</div>
              <h3 className="text-xl font-bold mb-3 text-black">Local Knowledge</h3>
              <p className="text-gray-600 text-sm leading-relaxed">We understand your community and its unique needs. Our solutions are built with local insight and relevance.</p>
            </div>
            
            {/* Proven Track Record */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:scale-105 transition-transform duration-300 flex flex-col">
              <div className="text-3xl mb-4">📈</div>
              <h3 className="text-xl font-bold mb-3 text-black">Proven Track Record</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Hundreds of businesses trust us for consistent, high-quality results. We deliver outcomes, not just promises.</p>
            </div>
          </div>
        </div>
      </section>

      {/* International Presence Section */}
      <section className="bg-black text-white py-20">
        <div className="max-w-[1200px] mx-auto px-6 text-center aos-init aos-animate" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8">International Presence</h2>
          <div className="w-full h-96 bg-gray-800 rounded-lg mb-8 flex items-center justify-center">
            <div className="text-center">
              <div className="w-64 h-32 bg-gray-700 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-400 text-lg font-medium">World Map</span>
              </div>
              <p className="text-gray-400 text-lg">Expanding our presence across multiple regions</p>
            </div>
          </div>
          <div className="btn-container w-full flex justify-center">
                  <a href="#" className="inline-block bg-[#FF6600] text-white font-medium text-lg px-8 py-4 rounded-full hover:bg-orange-500 transition-colors">Learn More</a>
                </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="bg-[#F4F4F4] text-black pt-[90px] pb-[90px] w-full min-w-0 min-h-0 lg:min-w-[1680px] lg:min-h-[536.19px] flex justify-center items-center">
        <div className="max-w-[1200px] w-full mx-auto px-6 flex flex-col items-center aos-init aos-animate" data-aos="fade-up">
          <h2 className="text-[48px] font-extrabold mb-12 text-center">Contact Us</h2>
          <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-12 w-full">
            {/* For Fuel Card */}
            <div className="w-[413.33px] h-[159.59px] bg-white rounded-[20px] p-5 flex flex-col justify-center shadow-lg hover:shadow-xl transition-shadow">
              <h4 className="text-[30px] font-compressed-medium text-gray-900 mb-4 text-left leading-[48px] tracking-[0.2px]">For Fuel</h4>
              <div className="text-left">
                <p className="text-[14px] lg:text-[18px] text-gray-700 mb-1">Email us:</p>
                <a href="mailto:info@quicktrackfuel.com" className="text-[14px] lg:text-[18px] text-[#FF6600] hover:underline break-all">info@quicktrackfuel.com</a>
              </div>
            </div>

            {/* For LaMa Wholesale Card */}
            <div className="w-[413.33px] h-[159.59px] bg-white rounded-[20px] p-5 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
              <h4 className="text-[30px] font-compressed-medium text-gray-900 mb-4 text-left leading-[48px] tracking-[0.2px]">For LaMa Wholesale</h4>
              <div className="text-left">
                <p className="text-[14px] lg:text-[18px] text-gray-700 mb-1">Email us:</p>
                <a href="mailto:info@lamawholesale.com" className="text-[14px] lg:text-[18px] text-[#FF6600] hover:underline break-all">info@lamawholesale.com</a>
              </div>
            </div>

            {/* For LaMa Foundation Card */}
            <div className="w-[413.33px] h-[159.59px] bg-white rounded-[20px] p-5 flex flex-col justify-center shadow-lg hover:shadow-xl transition-shadow">
              <h4 className="text-[30px] font-compressed-medium text-gray-900 mb-4 text-left leading-[48px] tracking-[0.2px]">For LaMa Foundation</h4>
              <div className="text-left">
                <p className="text-[14px] lg:text-[18px] text-gray-700 mb-1">Email us:</p>
                <a href="mailto:info@lamafoundation.com" className="text-[14px] lg:text-[18px] text-[#FF6600] hover:underline break-all">info@lamafoundation.com</a>
          </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
} 