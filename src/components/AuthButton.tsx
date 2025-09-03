"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated" && !!session?.user;

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-700">Hi, {session?.user?.name ?? "User"}</span>
        <button
          className="px-3 py-1.5 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-900 text-sm"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <button
      className="px-3 py-1.5 rounded-md bg-black text-white text-sm hover:bg-gray-900"
      onClick={() => signIn(undefined, { callbackUrl: "/" })}
    >
      Sign in
    </button>
  );
}


