"use client";
import React, { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import HeroSection from "./HeroSection";

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

      {/* Blogs Section */}
      <section aria-labelledby="blogs-heading" className="w-full bg-white text-[#111] py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <h2 id="blogs-heading" className="text-4xl md:text-5xl font-extrabold tracking-tight">Blogs</h2>
            <div className="text-right">
              <span className="inline-block text-sm uppercase tracking-wide text-[#FF4D4D] bg-[#FF4D4D]/10 px-3 py-1 rounded-full border border-[#FF4D4D]/20">
                Latest News
              </span>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Trending Topics (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              <h3 className="text-xl font-semibold text-[#1A1A1A]">Trending Topics</h3>

              {/* Medium Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Card 1 */}
                <a href="#" className="group overflow-hidden rounded-2xl border border-black/10 bg-white hover:shadow-xl transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=1200&auto=format&fit=crop"
                      alt="Advanced recycling systems"
                      loading="lazy"
                      className="w-full aspect-[4/3] object-cover transform transition-transform duration-500 group-hover:scale-105"
                    />
              </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs font-medium mb-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#00FFA3]/15 text-[#0F766E] border border-[#00FFA3]/30">Sustainability</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-600">3 min read</span>
              </div>
                    <h4 className="text-lg md:text-xl font-bold text-[#111] leading-snug">Carbon Capture Innovations Transforming Retail Energy</h4>
                    <p className="mt-2 text-sm text-gray-600">Exploring next-gen carbon capture and storage solutions designed for scalable deployment across c-store networks.</p>
            </div>
                </a>

                {/* Card 2 */}
                <a href="#" className="group overflow-hidden rounded-2xl border border-black/10 bg-white hover:shadow-xl transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop"
                      alt="AI-driven operations"
                      loading="lazy"
                      className="w-full aspect-[4/3] object-cover transform transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs font-medium mb-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#FF4D4D]/10 text-[#B91C1C] border border-[#FF4D4D]/30">Operations</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-600">5 min read</span>
                    </div>
                    <h4 className="text-lg md:text-xl font-bold text-[#111] leading-snug">AI Workflows Boost Uptime Across Fuel & Retail</h4>
                    <p className="mt-2 text-sm text-gray-600">From predictive maintenance to dynamic pricing—how AI delivers measurable ROI in multi-location environments.</p>
              </div>
                </a>
              </div>
            </div>

            {/* Right: Latest News (4 cols) */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-4">
                <h3 className="text-xl font-semibold text-[#1A1A1A]">Latest News</h3>
                <ul className="space-y-3">
                  {/* Item */}
                  <li>
                    <a href="#" className="block rounded-xl border border-black/10 bg-white hover:bg-black/[0.02] transition-all duration-200 p-4">
                      <div className="flex items-start gap-3">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#0F766E] mt-1">Carbon Capture</span>
                        <div className="flex-1">
                          <p className="text-sm md:text-base font-semibold text-[#111]">New federal incentives accelerate CCS at regional facilities</p>
                          <p className="text-xs text-gray-600 mt-1">2 min read</p>
              </div>
            </div>
                    </a>
                  </li>
                  {/* Item */}
                  <li>
                    <a href="#" className="block rounded-xl border border-black/10 bg-white hover:bg-black/[0.02] transition-all duration-200 p-4">
                      <div className="flex items-start gap-3">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#B91C1C] mt-1">AI</span>
                        <div className="flex-1">
                          <p className="text-sm md:text-base font-semibold text-[#111]">Computer vision reduces shrink by 18% in pilot program</p>
                          <p className="text-xs text-gray-600 mt-1">3 min read</p>
          </div>
                </div>
                    </a>
                  </li>
                  {/* Item */}
                  <li>
                    <a href="#" className="block rounded-xl border border-black/10 bg-white hover:bg-black/[0.02] transition-all duration-200 p-4">
                      <div className="flex items-start gap-3">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#0369A1] mt-1">Supply</span>
                        <div className="flex-1">
                          <p className="text-sm md:text-base font-semibold text-[#111]">Wholesale optimization improves margin resilience</p>
                          <p className="text-xs text-gray-600 mt-1">4 min read</p>
                </div>
              </div>
                    </a>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Why LaMa Section */}
      <section className="bg-gradient-to-r from-white via-orange-50 to-white text-black py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start aos-init aos-animate" data-aos="fade-up">
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

      {/* Contact Us Section */}
      <section className="bg-[#F4F4F4] text-black py-20">
        <div className="max-w-7xl w-full mx-auto px-6">
          <h2 className="text-4xl font-extrabold mb-12 text-center">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* For Fuel Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h4 className="text-2xl font-compressed-medium text-gray-900 mb-4 leading-[1.2] tracking-[0.2px]">For Fuel</h4>
              <p className="text-sm md:text-base text-gray-700 mb-1">Email us:</p>
              <a href="mailto:info@quicktrackfuel.com" className="text-sm md:text-base text-[#FF6600] hover:underline break-all">info@quicktrackfuel.com</a>
            </div>

            {/* For LaMa Wholesale Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h4 className="text-2xl font-compressed-medium text-gray-900 mb-4 leading-[1.2] tracking-[0.2px]">For LaMa Wholesale</h4>
              <p className="text-sm md:text-base text-gray-700 mb-1">Email us:</p>
              <a href="mailto:info@lamawholesale.com" className="text-sm md:text-base text-[#FF6600] hover:underline break-all">info@lamawholesale.com</a>
            </div>

            {/* For LaMa Foundation Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h4 className="text-2xl font-compressed-medium text-gray-900 mb-4 leading-[1.2] tracking-[0.2px]">For LaMa Foundation</h4>
              <p className="text-sm md:text-base text-gray-700 mb-1">Email us:</p>
              <a href="mailto:info@lamafoundation.com" className="text-sm md:text-base text-[#FF6600] hover:underline break-all">info@lamafoundation.com</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 