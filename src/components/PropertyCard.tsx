"use client";

import Image from "next/image";
import Link from "next/link";
import { chooseCardImage } from "@/lib/normalizeImage";
import { useSession } from "next-auth/react";

export default function PropertyCard({ node }: { node: any }) {
  const { data: session } = useSession();
  const img = chooseCardImage(node);
  const deal = node?.dealTypes?.nodes?.[0]?.slug;
  const badge = deal === "for-sale" ? "For Sale" : deal === "for-lease" ? "For Lease" : "Property";
  const addr = [node?.acf?.address, node?.acf?.city, node?.acf?.state, node?.acf?.zip].filter(Boolean).join(", ");
  const size = (node as any)?.acf?.sizeacres ? `${(node as any).acf.sizeacres} acres` : "—";
  const isLoggedIn = !!session?.user;
  const priceVisible = node?.priceVisibility === "public" || (node?.priceVisibility === "login" && isLoggedIn);
  const contactVisible = node?.contactVisibility === "public" || (node?.contactVisibility === "login" && isLoggedIn);
  const price = typeof (node?.price ?? (node as any)?.acf?.price) === "number" ? `$${Intl.NumberFormat().format(node?.price ?? (node as any)?.acf?.price)}` : "—";

  return (
    <Link href={`/store-leasing/${node.slug}`} className="block rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition">
      <div className="relative aspect-[16/9] bg-slate-100">
        {img && <Image src={img.url} alt={img.alt || node.title} fill className="object-cover" />}
      </div>
      <div className="p-4">
        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${deal === "for-sale" ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"}`}>{badge}</span>
        <h3 className="mt-2 line-clamp-2 font-semibold text-slate-900">{node.title}</h3>
        <p className="mt-1 text-sm text-slate-600 line-clamp-1">{addr}</p>
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="text-slate-700">Size: {size}</span>
          <span className="font-semibold text-slate-900">
            {priceVisible ? price : (
              <button 
                onClick={(e) => { e.preventDefault(); window.location.href = '/login'; }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium transition"
              >
                Login to view price
              </button>
            )}
          </span>
        </div>
        {!contactVisible && (
          <div className="mt-2 text-center">
            <button 
              onClick={(e) => { e.preventDefault(); window.location.href = '/login'; }}
              className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-xs font-medium transition"
            >
              Login to view contact
            </button>
          </div>
        )}
      </div>
    </Link>
  );
}
