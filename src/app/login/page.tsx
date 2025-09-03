"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import GoogleButton from "@/components/auth/GoogleButton";
import AuthTabs from "@/components/AuthTabs";

function LoginForm() {
  const sp = useSearchParams();
  const callbackUrl = sp.get("callbackUrl") || "/";
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null); setLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        login: login?.trim() || "",
        password: password || "",
        mode: "password",
        callbackUrl: callbackUrl || `${window.location.origin}/` // always valid absolute URL
      });
      
      if (result?.error) {
        // Handle specific error cases
        if (result.error === "CredentialsSignin") {
          setErr("Invalid username or password");
        } else {
          setErr("Login failed. Please try again.");
        }
        setLoading(false);
      } else if (result?.ok) {
        // Login successful, redirect manually
        window.location.href = callbackUrl;
      }
    } catch (error) {
      console.error("Login error:", error);
      setErr("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[80vh] grid place-items-center px-4">
      <div className="w-full max-w-md rounded-[16px] border border-slate-200 bg-white shadow-md">
        <AuthTabs />
        {err && <div className="mx-4 rounded-[10px] bg-amber-50 text-amber-900 border border-amber-200 p-2 text-sm">{err}</div>}
        <div className="p-4 sm:p-6">
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-slate-500 mb-1">Email or Username</label>
              <input type="text" required value={login} onChange={(e) => setLogin(e.target.value)} className="w-full h-11 rounded-[12px] border border-slate-200 px-3 focus:outline-none focus:ring-2 focus:ring-slate-300" placeholder="Enter your email or username" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs text-slate-500">Password</label>
                <a href={`/forgot?callbackUrl=${encodeURIComponent(callbackUrl)}`} className="text-xs text-slate-600 hover:underline">Forgot password?</a>
              </div>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full h-11 rounded-[12px] border border-slate-200 px-3 focus:outline-none focus:ring-2 focus:ring-slate-300" placeholder="Enter your password" />
            </div>
            <button type="submit" disabled={loading} className="w-full h-12 rounded-[12px] bg-[#f97316] hover:bg-orange-600 text-white text-[16px] font-medium">
              {loading ? "Logging in..." : "Log In"}
            </button>

            <div className="my-4 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200" /><span className="text-slate-400 text-sm">OR</span><div className="h-px flex-1 bg-slate-200" />
            </div>
            <GoogleButton
              label="Sign in with Google"
              onClick={() => {
                // Trigger Google OAuth sign-in
                signIn("google", { callbackUrl: callbackUrl || `${window.location.origin}/` });
              }}
            />

            <p className="mt-4 text-center text-sm text-slate-600">
              Don&apos;t have an account yet? <a href={`/sign-up?callbackUrl=${encodeURIComponent(callbackUrl)}`} className="text-slate-900 underline">Sign up</a>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}