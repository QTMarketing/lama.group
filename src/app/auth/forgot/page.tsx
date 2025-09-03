"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { forgotPassword } from "@/lib/wp-auth";

function ForgotForm() {
  const sp = useSearchParams();
  const callbackUrl = sp.get("callbackUrl") || "/";
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try { await forgotPassword(email, callbackUrl); setSent(true); }
    finally { setLoading(false); }
  }

  return (
    <main className="min-h-[80vh] grid place-items-center px-4">
      <div className="w-full max-w-md rounded-[16px] border border-slate-200 bg-white shadow-md p-6">
        <h1 className="text-center text-[20px] leading-[28px] font-semibold text-slate-900">Forgot password</h1>
        {sent ? (
          <div className="mt-4 rounded-[10px] border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">
            If an account exists for <span className="font-medium">{email}</span>, a reset link has been sent. Check your inbox and spam.
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-4 space-y-4">
            <div>
              <label className="mb-1 block text-xs text-slate-500">Email address</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full h-11 rounded-[12px] border border-slate-200 px-3 focus:outline-none focus:ring-2 focus:ring-slate-300" placeholder="Enter your email address" />
            </div>
            <button type="submit" disabled={loading} className="w-full h-12 rounded-[12px] bg-gradient-to-b from-slate-800 to-slate-900 text-white text-[16px] leading-[24px] font-medium">
              {loading ? "Sending..." : "Send reset link"}
            </button>
            <p className="text-center text-sm text-slate-600">
              Remembered your password? <a href={`/auth?mode=login&callbackUrl=${encodeURIComponent(callbackUrl)}`} className="text-slate-900 underline">Back to login</a>
            </p>
          </form>
        )}
      </div>
    </main>
  );
}

export default function ForgotPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ForgotForm />
    </Suspense>
  );
}
