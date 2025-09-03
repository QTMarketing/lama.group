"use client";

// components/PropertyCardExact.tsx
import Image from "next/image";
import Link from "next/link";
import { formatSize } from "@/lib/format";

type PropertyNode = {
  id: string;
  slug: string;
  title: string;
  dealTypes?: { nodes?: { slug?: string; name?: string }[] };
  acf?: {
    heroimage?: { url?: string; alt?: string };
    address?: string; city?: string; state?: string; zip?: string;
    sizeAcres?: number | string;
    price?: number | string;
    priceVisibility?: "public" | "login" | string;
    contactVisibility?: "public" | "login" | string;
  };
  propertyFields?: {
    heroimage?: { sourceUrl?: string; altText?: string };
    address?: string; city?: string; state?: string; zip?: string;
    sizeacres?: number | string;
    price?: number | string;
    pricevisibility?: "public" | "login" | string;
    contactvisibility?: "public" | "login" | string;
  };
  featuredImage?: { node?: { sourceUrl?: string; altText?: string } };
};

function pickImage(n: PropertyNode) {
  if (n?.acf?.heroimage?.url) return { url: n.acf.heroimage.url, alt: n.acf.heroimage.alt || n.title };
  if (n?.propertyFields?.heroimage?.sourceUrl) return { url: n.propertyFields.heroimage.sourceUrl, alt: n.propertyFields.heroimage.altText || n.title };
  const wp = n?.featuredImage?.node?.sourceUrl;
  if (wp) return { url: wp, alt: n?.featuredImage?.node?.altText || n.title };
  return null;
}

export default function PropertyCardExact({ node, isAuthed = false }: { node: PropertyNode; isAuthed?: boolean }) {
  const img = pickImage(node);
  const deal = node?.dealTypes?.nodes?.[0]?.slug; // "for-sale" | "for-lease"
  const badge = deal === "for-sale" ? "For Sale" : deal === "for-lease" ? "For Lease" : "";
  const badgeColor = deal === "for-sale" ? "bg-emerald-100 text-emerald-800" : deal === "for-lease" ? "bg-blue-100 text-blue-800" : "";

  const sizeText = formatSize({
    dealSlug: deal,
    acres: node?.acf?.sizeAcres ?? node?.propertyFields?.sizeacres,
    sqft: (node?.acf as any)?.sizesqft ?? (node?.propertyFields as any)?.sizesqft,
  });

  const priceVisible = ((node?.acf?.priceVisibility || node?.propertyFields?.pricevisibility || "login") !== "login") || isAuthed;
  const priceValue = node?.acf?.price ?? node?.propertyFields?.price;
  const price =
    typeof priceValue === "number"
      ? `$${Intl.NumberFormat().format(priceValue)}`
      : typeof priceValue === "string" && priceValue?.trim() !== ""
      ? priceValue
      : "—";

  const contactVisible = ((node?.acf?.contactVisibility || node?.propertyFields?.contactvisibility || "login") !== "login") || isAuthed;

  return (
    <Link
      href={`/store-leasing/${node.slug}`}
      className="block"
      style={{ width: 386 }}
      aria-label={node.title}
    >
      <div
        className="relative overflow-hidden bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
        style={{ borderRadius: 16 }}
      >
        {/* Image area (384 x 218.65) */}
        <div
          className="relative mx-auto bg-gradient-to-br from-slate-200 to-slate-300"
          style={{ width: 384, height: 218.65, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
        >
          {img ? (
            <Image
              src={img.url}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="384px"
              style={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path d="M5 21h14a1 1 0 0 0 1-1V8.5l-7-5-7 5V20a1 1 0 0 0 1 1Z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M9 21v-6h6v6" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              <p className="mt-2 text-sm">Property Image</p>
              <p className="text-xs">384 × 218.65</p>
            </div>
          )}
        </div>

        {/* Info area (fixed 296 height) */}
        <div className="flex flex-col justify-between px-6" style={{ height: 296 }}>
          <div>
            {/* Badge */}
            {badge && (
              <span className={`inline-flex mt-5 rounded-full ${badgeColor} text-xs font-semibold px-3 py-1`}>
                {badge}
              </span>
            )}

            {/* Title */}
            <h3 className="mt-3 font-bold text-slate-900 leading-snug" style={{ fontSize: 22, lineHeight: "1.2" }}>
              {node.title}
            </h3>

            {/* Size row */}
            <div className="mt-4 flex items-center gap-2 text-slate-700">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-slate-400">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span className="text-[15px]">Size: {sizeText}</span>
            </div>

            {/* Price row */}
            <div className="mt-3 flex items-center gap-3">
              {priceVisible ? (
                <span className="text-slate-900 font-semibold" style={{fontSize: '20px'}}>{price}</span>
              ) : (
                <>
                  <span className="inline-flex items-center rounded-lg bg-slate-100 text-slate-700 text-sm px-3 py-2">
                    Login to view price
                  </span>
                  <button 
                    className="text-blue-600 text-sm underline bg-transparent border-none cursor-pointer p-0"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      window.location.href = '/login';
                    }}
                  >
                    Sign in
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Bottom contact gate */}
          <div className="mb-5 mt-6 flex items-center justify-between">
            {!contactVisible ? (
              <>
                <span className="text-slate-600 text-[16px]">Login to view contact details</span>
                <button 
                  className="text-blue-600 underline bg-transparent border-none cursor-pointer p-0"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.location.href = '/login';
                  }}
                >
                  Sign in
                </button>
              </>
            ) : (
              <span className="text-slate-700 text-[15px]">Contact available after opening</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
