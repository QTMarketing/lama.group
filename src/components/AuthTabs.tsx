"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function AuthTabs() {
  const pathname = usePathname();
  const sp = useSearchParams();
  const callbackUrl = sp.get("callbackUrl") || "/";
  const loginActive = pathname === "/login";
  const signupActive = pathname === "/sign-up";
  const pill = "h-9 px-4 rounded-[12px] text-sm font-medium";
  return (
    <div className="flex justify-center gap-2 p-4">
      <Link href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`} className={`${pill} ${loginActive ? "bg-slate-900 text-white" : "border border-slate-300 text-slate-700"}`}>Login</Link>
      <Link href={`/sign-up?callbackUrl=${encodeURIComponent(callbackUrl)}`} className={`${pill} ${signupActive ? "bg-slate-900 text-white" : "border border-slate-300 text-slate-700"}`}>Sign Up</Link>
    </div>
  );
}


