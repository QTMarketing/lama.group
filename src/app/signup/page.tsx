"use client";
import { useState, FormEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

function SignupForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const sp = useSearchParams();
  const callbackUrl = sp.get("callbackUrl") || "/";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;
    const username = formData.get("username") as string;

    try {
      const res = await signIn("credentials", {
        email,
        password,
        name,
        username,
        mode: "otp",
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid credentials");
        return;
      }

      router.push(callbackUrl);
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[80vh] grid place-items-center px-4">
      <div className="w-full max-w-md rounded-[16px] border border-slate-200 bg-white shadow-md p-6">
        <h1 className="text-center text-[20px] leading-[28px] font-semibold text-slate-900">Sign up</h1>
        {error && (
          <div className="mt-4 rounded-[10px] border border-red-200 bg-red-50 p-3 text-sm text-red-900">
            {error}
          </div>
        )}
        <form onSubmit={onSubmit} className="mt-4 space-y-4">
          <div>
            <label className="mb-1 block text-xs text-slate-500">Full name</label>
            <input name="name" required className="w-full h-11 rounded-[12px] border border-slate-200 px-3 focus:outline-none focus:ring-2 focus:ring-slate-300" placeholder="Enter your full name" />
          </div>
          <div>
            <label className="mb-1 block text-xs text-slate-500">Username</label>
            <input name="username" required className="w-full h-11 rounded-[12px] border border-slate-200 px-3 focus:outline-none focus:ring-2 focus:ring-slate-300" placeholder="Choose a username" />
          </div>
          <div>
            <label className="mb-1 block text-xs text-slate-500">Email address</label>
            <input name="email" type="email" required className="w-full h-11 rounded-[12px] border border-slate-200 px-3 focus:outline-none focus:ring-2 focus:ring-slate-300" placeholder="Enter your email address" />
          </div>
          <div>
            <label className="mb-1 block text-xs text-slate-500">Password</label>
            <input name="password" type="password" required className="w-full h-11 rounded-[12px] border border-slate-200 px-3 focus:outline-none focus:ring-2 focus:ring-slate-300" placeholder="Create a password" />
          </div>
          <button type="submit" disabled={loading} className="w-full h-12 rounded-[12px] bg-gradient-to-b from-slate-800 to-slate-900 text-white text-[16px] leading-[24px] font-medium">
            {loading ? "Creating account..." : "Create account"}
          </button>
          <p className="text-center text-sm text-slate-600">
            Already have an account? <a href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`} className="text-slate-900 underline">Sign in</a>
          </p>
        </form>
      </div>
    </main>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupForm />
    </Suspense>
  );
}
