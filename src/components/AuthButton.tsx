"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthButton() {
  const { data: session, status } = useSession();
  if (status === "loading") return <span className="text-sm text-gray-500">Loading…</span>;
  if (!session) {
    return (
      <button onClick={() => signIn()} className="px-3 py-1 rounded bg-black text-white">
        Log in
      </button>
    );
  }
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm">Hi, {session.user?.name ?? "Member"}</span>
      <button onClick={() => signOut()} className="px-3 py-1 rounded border">Log out</button>
    </div>
  );
} 