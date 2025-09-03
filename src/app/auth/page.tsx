"use client";

import { useMemo, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { requestOtp } from "@/lib/wp-auth";
import SocialButtons from "@/components/SocialButtons";

function useCallbackUrl() {
  const sp = useSearchParams();
  return sp.get("callbackUrl") || "/";
}

export default function AuthPage() {
  const sp = useSearchParams();
  const callbackUrl = useCallbackUrl();

  const initialMode = (sp.get("mode") || "login") as "login" | "signup";
  const [mode, setMode] = useState<"login" | "signup">(initialMode);

  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLoginPw, setShowLoginPw] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPw, setSignupPw] = useState("");
  const [signupPw2, setSignupPw2] = useState("");
  const [showSignupPw, setShowSignupPw] = useState(false);

  useEffect(() => { setMode(initialMode); }, [initialMode]);

  async function onLoginSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null); setLoading(true);
    try {
      await signIn("credentials", { redirect: true, callbackUrl, identifier: loginIdentifier, email: loginIdentifier, password: loginPassword, mode: "password" });
    } catch (e: any) {
      setErr("Invalid credentials.");
    } finally { setLoading(false); }
  }

  function passwordsValid() { return signupPw.length >= 8 && signupPw === signupPw2; }

  

  function Divider() {
    return (
      <div className="my-4 flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-slate-400 text-sm">OR</span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>
    );
  }

  return (
    <main className="min-h-[80vh] grid place-items-center px-4">
      <div className="w-full max-w-md rounded-[16px] border border-slate-200 bg-white shadow-md">
        <div className="flex justify-center gap-2 p-4">
          <button onClick={() => setMode("login")} className={`h-9 px-4 rounded-[12px] text-sm font-medium ${mode === "login" ? "bg-slate-900 text-white" : "border border-slate-300 text-slate-700"}`}>Login</button>
          <button onClick={() => setMode("signup")} className={`h-9 px-4 rounded-[12px] text-sm font-medium ${mode === "signup" ? "bg-slate-900 text-white" : "border border-slate-300 text-slate-700"}`}>Sign Up</button>
        </div>

        {err && (<div className="mx-4 rounded-[10px] bg-amber-50 text-amber-900 border border-amber-200 p-2 text-sm">{err}</div>)}

        <div className="p-4 sm:p-6">
          {mode === "login" ? (
            <form onSubmit={onLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-500 mb-1">Email or Username</label>
                <input type="text" required value={loginIdentifier} onChange={(e) => setLoginIdentifier(e.target.value)} className="w-full h-11 rounded-[12px] border border-slate-200 px-3 focus:outline-none focus:ring-2 focus:ring-slate-300" placeholder="Enter email or username" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs text-slate-500">Password</label>
                  <a href={`/auth/forgot?callbackUrl=${encodeURIComponent(callbackUrl)}`} className="text-xs text-slate-600 hover:underline">Forgot password?</a>
                </div>
                <div className="relative">
                  <input type={showLoginPw ? "text" : "password"} required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="w-full h-11 rounded-[12px] border border-slate-200 px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-slate-300" placeholder="Enter your password" />
                  <button type="button" onClick={() => setShowLoginPw(!showLoginPw)} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 text-sm">
                    {showLoginPw ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <button type="submit" disabled={loading} className="w-full h-12 rounded-[12px] bg-gradient-to-b from-slate-800 to-slate-900 text-white text-[16px] font-medium">{loading ? "Logging in..." : "Log In"}</button>
              <Divider />
              <SocialButtons callbackUrl={callbackUrl} labelOverride={{ google: "Login with Google" }} />
              <p className="mt-4 text-center text-sm text-slate-600">Don&apos;t have an account yet? <button onClick={() => setMode("signup")} className="text-slate-900 underline">Sign up</button></p>
            </form>
          ) : (
            <form onSubmit={onLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-500 mb-1">Full Name</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full h-11 rounded-[12px] border border-slate-200 px-3 focus:outline-none focus:ring-2 focus:ring-slate-300" placeholder="Enter your full name" />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Phone number (optional)</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full h-11 rounded-[12px] border border-slate-200 px-3 focus:outline-none focus:ring-2 focus:ring-slate-300" placeholder="Enter your phone" />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Email Address</label>
                <input type="email" required value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} className="w-full h-11 rounded-[12px] border border-slate-200 px-3 focus:outline-none focus:ring-2 focus:ring-slate-300" placeholder="Enter your email" />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Password</label>
                <div className="relative">
                  <input type={showSignupPw ? "text" : "password"} required value={signupPw} onChange={(e) => setSignupPw(e.target.value)} className="w-full h-11 rounded-[12px] border border-slate-200 px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-slate-300" placeholder="Create a password (min 8 chars)" />
                  <button type="button" onClick={() => setShowSignupPw(!showSignupPw)} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 text-sm">
                    {showSignupPw ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Confirm Password</label>
                <input type={showSignupPw ? "text" : "password"} required value={signupPw2} onChange={(e) => setSignupPw2(e.target.value)} className="w-full h-11 rounded-[12px] border border-slate-200 px-3 focus:outline-none focus:ring-2 focus:ring-slate-300" placeholder="Re-enter the password" />
              </div>
              <button type="submit" disabled={loading || !passwordsValid()} className="w-full h-12 rounded-[12px] bg-gradient-to-b from-slate-800 to-slate-900 text-white text-[16px] font-medium">{loading ? "Creating..." : "Create Account"}</button>
              <Divider />
              <SocialButtons callbackUrl={callbackUrl} labelOverride={{ google: "Continue with Google" }} />
              <p className="mt-4 text-center text-sm text-slate-600">Already have an account? <button onClick={() => setMode("login")} className="text-slate-900 underline">Sign in</button></p>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}


