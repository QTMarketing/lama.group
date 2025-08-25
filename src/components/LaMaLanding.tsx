"use client";
import React, { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import HeroSection from "./HeroSection";
import StatusBar from "./StatusBar";

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
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          {/* Terms and Privacy Policy (Sign Up Only) */}
          {mode === 'signup' && (
            <div className="flex items-start space-x-2">
              <input
                id="accept-terms"
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-[#007BFF] focus:ring-[#007BFF] focus:ring-2"
              />
              <label htmlFor="accept-terms" className="text-xs text-gray-600">
                I accept the{" "}
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
          <button
            onClick={handleSubmit}
            className="w-full h-12 bg-[#007BFF] text-white font-semibold rounded-lg hover:bg-[#0062cc] transition-colors focus:outline-none focus:ring-2 focus:ring-[#007BFF] focus:ring-offset-2"
          >
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </div>

        {/* Toggle Mode */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {mode === 'login' ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={handleToggleMode}
              className="text-[#007BFF] hover:underline font-medium"
            >
              {mode === 'login' ? 'Sign up' : 'Log in'}
            </button>
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
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Status Bar */}
      <StatusBar />

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
    </>
  );
} 