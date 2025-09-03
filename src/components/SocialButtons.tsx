"use client";
import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import type { ClientSafeProvider } from "next-auth/react";
import { SiGoogle, SiApple, SiFacebook } from "react-icons/si";

function IconFor(id: string) {
  if (id === "google") return <SiGoogle size={18} className="text-slate-700" />;
  if (id === "apple") return <SiApple size={18} className="text-slate-700" />;
  if (id === "facebook") return <SiFacebook size={18} className="text-slate-700" />;
  return null;
}

export default function SocialButtons({ callbackUrl }: { callbackUrl: string }) {
  const [providers, setProviders] = useState<Record<string, ClientSafeProvider>>({});
  useEffect(() => { (async () => setProviders((await getProviders()) || {}))(); }, []);
  const socials = Object.values(providers).filter((p) => ["google","apple","facebook"].includes(p.id));
  if (!socials.length) return null;

  return (
    <div className="mt-4 space-y-3">
      {socials.map((p) => (
        <button
          key={p.id}
          onClick={() => signIn(p.id, { callbackUrl })}
          className="w-full h-11 rounded-[12px] border border-slate-200 bg-white flex items-center justify-center gap-2 text-[16px] font-medium"
        >
          {IconFor(p.id)} Sign in with {p.name}
        </button>
      ))}
    </div>
  );
}

