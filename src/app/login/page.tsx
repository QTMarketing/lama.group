"use client";
import { FormEvent, useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const sp = useSearchParams();
  const callbackUrl = sp.get("callbackUrl") || "/properties";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const username = String(form.get("username"));
    const password = String(form.get("password"));
    setError(null);
    const res = await signIn("credentials", { redirect: false, username, password, callbackUrl });
    if (!res || res.error) {
      setError("Invalid credentials");
    } else {
      router.push(callbackUrl);
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-semibold mb-4">Log in</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Username</label>
          <input name="username" className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input name="password" type="password" className="w-full border rounded px-3 py-2" required />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" className="w-full py-2 bg-black text-white rounded">Sign in</button>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="max-w-sm mx-auto mt-10 p-6 text-sm text-gray-500">Loading…</div>}>
      <LoginForm />
    </Suspense>
  );
} 