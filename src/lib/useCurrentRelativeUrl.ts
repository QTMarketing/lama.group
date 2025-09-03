"use client";
import { usePathname, useSearchParams } from "next/navigation";

export function useCurrentRelativeUrl() {
  const pathname = usePathname() || "/";
  const sp = useSearchParams();
  const qs = sp?.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}

