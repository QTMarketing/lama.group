"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { resetPassword } from "@/lib/wp-auth";
import { signIn } from "next-auth/react";

export default function ResetPage() {
  const sp = useSearchParams();
  const login = sp.get("login") || "";
  const key = sp.get("key") || "";
  const callbackUrl = sp.get("callbackUrl") || "/";
  const [p1, setP1] = useState(""); const [p2, setP2] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (p1.length < 8) return setErr("Password must be at least 8 characters.");
    if (p1 !== p2) return setErr("Passwords do not match.");
    setLoading(true);
    try {
      const user = await resetPassword(login, key, p1);
      setOk("Password updated. Signing you in…");
      await signIn("credentials", { redirect: true, callbackUrl, login: user.email, password: p1, mode: "password" });
    } catch { setErr("Reset failed. The link may be invalid or expired."); setLoading(false); }
  }

  return (
    <main className="min-h-[80vh] grid place-items-center px-4">
      <div className="w-full max-w-md rounded-[16px] border border-slate-200 bg-white shadow-md p-6">
        <h1 className="text-center text-[20px] leading-[28px] font-semibold text-slate-900">Set a new password</h1>
        {err && <div className="mt-3 rounded-[10px] border border-amber-200 bg-amber-50 p-2 text-sm text-amber-900">{err}</div>}
        {ok && <div className="mt-3 rounded-[10px] border border-emerald-200 bg-emerald-50 p-2 text-sm text-emerald-900">{ok}</div>}
        <form onSubmit={onSubmit} className="mt-4 space-y-4">
          <div>
            <label className="mb-1 block text-xs text-slate-500">New password</label>
            <input type="password" required value={p1} onChange={(e) => setP1(e.target.value)} className="w-full h-11 rounded-[12px] border border-slate-200 px-3 focus:outline-none focus:ring-2 focus:ring-slate-300" placeholder="Enter a new password" />
          </div>
          <div>
            <label className="mb-1 block text-xs text-slate-500">Confirm password</label>
            <input type="password" required value={p2} onChange={(e) => setP2(e.target.value)} className="w-full h-11 rounded-[12px] border border-slate-200 px-3 focus:outline-none focus:ring-2 focus:ring-slate-300" placeholder="Re-enter the new password" />
          </div>
          <button type="submit" disabled={loading || !login || !key} className="w-full h-12 rounded-[12px] bg-gradient-to-b from-slate-800 to-slate-900 text-white text-[16px] leading-[24px] font-medium">
            {loading ? "Updating..." : "Update password"}
          </button>
          <p className="text-center text-sm text-slate-600">
            Back to <a href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`} className="text-slate-900 underline">login</a>
          </p>
        </form>
      </div>
    </main>
  );
}


