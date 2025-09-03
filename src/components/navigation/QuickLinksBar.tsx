'use client';

import Link from "next/link";
import { LoginLink, SignupLink } from "@/components/AuthLinks";
import { useSession, signOut } from "next-auth/react";
import { usePathname, useSearchParams } from "next/navigation";

const topLinks = [
  { label: "QuickTrack Inc", href: "https://quicktrackinc.com/" },
  { label: "LaMa Wholesale", href: "https://www.lamawholesale.com/" },
  { label: "QuickTrack Fuel", href: "https://www.quicktrackfuel.com/" },
];

export function QuickLinksBar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const search = useSearchParams();
  const callbackUrl = `${pathname}${search?.toString() ? `?${search}` : ""}`;

  return (
    <div className="w-full bg-white border-b flex flex-col sm:flex-row justify-between items-center px-2 sm:px-4 md:px-12 py-2 gap-y-2">
      <div className="flex flex-wrap gap-x-4 sm:gap-x-6 text-black text-sm font-medium justify-center">
        {topLinks.map((link) => (
          <a 
            key={link.label} 
            href={link.href} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:underline"
          >
            {link.label}
          </a>
        ))}
      </div>
      <div className="flex gap-3">
        {!session ? (
          <>
            <LoginLink className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all text-sm px-4 py-1 bg-[#007BFF] hover:bg-[#0062cc] text-white rounded-md" />
            <SignupLink className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all text-sm px-4 py-1 bg-[#007BFF] hover:bg-[#0062cc] text-white rounded-md" />
          </>
        ) : (
          <>
            <span className="text-xs sm:text-sm">Hi, {session.user?.name ?? "Member"}</span>
            <button onClick={() => signOut()} className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all text-sm px-4 py-1 bg-[#007BFF] hover:bg-[#0062cc] text-white rounded-md">
              Log out
            </button>
          </>
        )}
      </div>
    </div>
  );
} 