"use client";
import Link from "next/link";
import { useCurrentRelativeUrl } from "@/lib/useCurrentRelativeUrl";

export function LoginLink({ children = "Login", className = "" }: { children?: React.ReactNode; className?: string }) {
  const here = useCurrentRelativeUrl();
  return <Link className={className} href={`/login?callbackUrl=${encodeURIComponent(here)}`}>{children}</Link>;
}

export function SignupLink({ children = "Sign up", className = "" }: { children?: React.ReactNode; className?: string }) {
  const here = useCurrentRelativeUrl();
  return <Link className={className} href={`/sign-up?callbackUrl=${encodeURIComponent(here)}`}>{children}</Link>;
}


