import { wpClient } from "@/lib/wpClient";
import { PROPERTY_DETAIL_FREE } from "@/lib/queries/property-detail-free";
import { fetchGraphQL } from "@/lib/cms";
import { acfImg } from "@/lib/normalizeImage";
import { formatSize, buildGoogleEmbedNoKey } from "@/lib/format";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import PartnershipDealerForm from "@/components/PartnershipDealerForm";
import { authOptions } from "@/lib/auth";

export const revalidate = 60;

export const dynamicParams = false; // pre-render only returned slugs
export const revalidate = 60; // ISR for freshness

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const LIST_SLUGS = `
    query AllPropertySlugs($first: Int! = 200) {
      properties(first: $first, where: { status: PUBLISH }) {
        nodes { slug }
      }
    }
  `;
  const data = await fetchGraphQL<any>(LIST_SLUGS);
  const nodes: { slug: string }[] = data?.properties?.nodes || [];
  return nodes.filter(Boolean).map((n) => ({ slug: n.slug }));
}

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const data = await wpClient.request<any>(PROPERTY_DETAIL_FREE, { slug });
  const p = data?.property;
  if (!p) return notFound();

  let isAuthed = false;
  try {
    const session = await getServerSession(authOptions);
    isAuthed = Boolean(session);
  } catch {}

  const deal = p?.dealTypes?.nodes?.[0]?.slug; // "for-sale" | "for-lease"
  const badge = deal === "for-sale" ? "For Sale" : deal === "for-lease" ? "For Lease" : "Property";

  const hero = (p?.featuredImage?.node?.sourceUrl ? { url: p.featuredImage.node.sourceUrl, alt: p.title } : null);

  const fullAddress = ""; // not exposed in GraphQL yet

  const priceVisible = (p?.priceVisibility || "login") !== "login" || isAuthed;
  // const contactVisible = p?.acf?.contactvisibility !== "login" || isAuthed;

  const priceText =
    typeof p?.price === "number"
      ? `$${Intl.NumberFormat().format(p.price)}`
      : (p?.price ?? "—");

  const sizeText = formatSize({ dealSlug: deal, acres: undefined, sqft: undefined });

  // Auto-generate overview content
  const generateOverview = () => {
    const propertyType = "Commercial Land";
    const size = sizeText;
    const location = fullAddress;
    const dealType = deal === "for-sale" ? "for sale" : deal === "for-lease" ? "for lease" : "available";
    
    return `This ${size} ${propertyType} property is currently ${dealType} and represents an excellent opportunity for commercial development. Located at ${location}, this strategically positioned property offers prime commercial potential with its commercial zoning and accessible location. The property is ideal for various commercial uses including retail, office, or mixed-use development. With its prime location and commercial zoning, this property presents a valuable investment opportunity in a growing market.`;
  };

  const overviewContent = p?.content || generateOverview();

  const highlights: string[] = (p?.highlightsText || "")
    .split(/\r?\n/).map((s: string) => s.trim()).filter(Boolean);
  const amenities: string[] = ("")
    .split(/\r?\n/).map((s: string) => s.trim()).filter(Boolean);

  const gallery: { url: string; alt?: string }[] = [];

  const embedSrc = buildGoogleEmbedNoKey(fullAddress, 15);

  return (
    <main className="mx-auto max-w-7xl px-4 pb-16 font-sans">
      {/* HERO */}
      <section className="relative mt-4 overflow-hidden rounded-[16px]">
        <div className="relative h-[44vh] min-h-[340px] bg-slate-200">
          {hero && <Image src={hero.url} alt={hero.alt || p.title} fill className="object-cover" />}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex items-center gap-2">
              <span className={`inline-flex rounded-full px-2 py-1 text-[14px] font-semibold ${deal === "for-sale" ? "bg-emerald-500/90" : "bg-blue-500/90"}`}>
                {badge}
              </span>
            </div>
            {/* EXACT title: 48px size + 48px line-height */}
            <h1 className="my-[10px] text-[48px] leading-[48px] font-extrabold tracking-tight">
              {p.title}
            </h1>
            {/* Price line: 18px font */}
            <p className="text-[18px] leading-[24px] text-white/85">
              {priceVisible ? priceText : <a href={`/auth?mode=login&callbackUrl=${encodeURIComponent(`/store-leasing/${p.slug}`)}`} className="underline">Login to view price</a>}
            </p>
          </div>
        </div>
      </section>

      {/* BODY grid */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr,360px]">
        {/* MAIN */}
        <section>
          <SectionTitle>Overview</SectionTitle>
          <div className="mt-3 text-[16px] leading-[24px] text-slate-700">
            {overviewContent}
          </div>

          {highlights.length > 0 && (
            <>
              <SectionTitle className="mt-10">Highlights</SectionTitle>
              <ul className="mt-3 flex flex-wrap gap-2">
                {highlights.map((h, i) => (
                  <li key={i} className="rounded-xl border border-slate-200 bg-slate-100 px-3 py-1.5 text-[14px] leading-[20px] font-medium text-slate-700">
                    {h}
                  </li>
                ))}
              </ul>
            </>
          )}

          {gallery.length > 0 && (
            <>
              <SectionTitle className="mt-10">Gallery</SectionTitle>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {gallery.map((g, i) => (
                  <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-[12px] bg-slate-100">
                    <Image src={g.url} alt={g.alt || `Image ${i + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </>
          )}

          {amenities.length > 0 && (
            <>
              <SectionTitle className="mt-10">Amenities</SectionTitle>
              <div className="mt-3 flex flex-wrap gap-2">
                {amenities.map((a, i) => (
                  <span key={i} className="inline-flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-[14px] leading-[20px] font-medium text-slate-700">
                    {a}
                  </span>
                ))}
              </div>
            </>
          )}

          <SectionTitle className="mt-10">Map & Area</SectionTitle>
          {fullAddress && <p className="mt-2 text-[16px] leading-[24px] text-slate-700">📍 {fullAddress}</p>}
          <div className="mt-3 h-[260px] overflow-hidden rounded-[16px] border border-slate-200 bg-slate-100">
            {embedSrc ? (
              <iframe src={embedSrc} className="h-full w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-slate-500">Interactive map coming soon</div>
            )}
          </div>
        </section>

        {/* SIDEBAR */}
        <aside className="space-y-6">
          <div className="rounded-[16px] border border-slate-200 p-5">
            {/* EXACT 20px / 28px */}
            <h3 className="text-[20px] leading-[28px] text-slate-900" style={{fontFamily: 'Plus Jakarta Sans Medium'}}>Key Details</h3>
            <dl className="mt-3 space-y-2">
              <Row label="Size"   value={sizeText} />
              <Row label="Type"   value="Commercial Land" />
              <Row label="Zoning" value="Commercial" />
              <Row label="Status" value={"Available"} />
              <div className="flex items-center justify-between gap-4">
                <dt className="text-[16px] leading-[24px] text-slate-600" style={{fontFamily: 'Plus Jakarta Sans Medium'}}>Price</dt>
                <dd className="text-right">
                  {priceVisible ? (
                    // EXACT 16px Inter Medium pill
                    <span className="inline-flex items-center rounded-[8px] bg-slate-900 px-3 py-2 text-[16px] leading-[24px] text-white" style={{fontFamily: 'Plus Jakarta Sans Medium'}}>
                      {priceText}
                    </span>
                  ) : (
                    <a href={`/auth?mode=login&callbackUrl=${encodeURIComponent(`/store-leasing/${p.slug}`)}`} className="inline-flex items-center rounded-[8px] bg-orange-500 px-3 py-2 text-[16px] leading-[24px] text-white hover:bg-orange-600" style={{fontFamily: 'Plus Jakarta Sans Medium'}}>
                      Login to view
                    </a>
                  )}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-[16px] border border-slate-200 p-5">
            <h3 className="text-[20px] leading-[28px] text-slate-900" style={{fontFamily: 'Plus Jakarta Sans Medium'}}>Contact</h3>
            <div className="mt-3 text-[16px] leading-[24px]">
              {isAuthed ? (
                <div className="space-y-3">
                  {/* Phone Number */}
                  <div className="flex items-center justify-between">
                    <a 
                      href="tel:8176180424" 
                      className="text-slate-700 hover:text-blue-600 transition-colors cursor-pointer" 
                      style={{fontFamily: 'Plus Jakarta Sans Medium'}}
                    >
                      817.618.0424
                    </a>
                    <a 
                      href="tel:8176180424" 
                      className="text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                    </a>
                  </div>
                  
                  {/* Email */}
                  <div className="flex items-center justify-between">
                    <a 
                      href="mailto:susanna@quicktrackinc.com" 
                      className="text-slate-700 hover:text-blue-600 transition-colors cursor-pointer" 
                      style={{fontFamily: 'Plus Jakarta Sans Medium'}}
                    >
                      susanna@quicktrackinc.com
                    </a>
                    <a 
                      href="mailto:susanna@quicktrackinc.com" 
                      className="text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                    </a>
                  </div>
                </div>
              ) : (
                <a href={`/auth?mode=login&callbackUrl=${encodeURIComponent(`/store-leasing/${p.slug}`)}`} className="inline-flex items-center rounded-[8px] bg-orange-500 px-3 py-2 text-[16px] leading-[24px] text-white hover:bg-orange-600" style={{fontFamily: 'Plus Jakarta Sans Medium'}}>
                  Login to view contact
                </a>
              )}
            </div>
          </div>

          {/* For-lease CTA: Partnership Dealer Opportunities Form */}
          {deal === "for-lease" && (
            <div className="rounded-[16px] border border-slate-200 p-5">
              <h3 className="text-[20px] leading-[28px] text-slate-900" style={{fontFamily: 'Plus Jakarta Sans Medium'}}>Partner With Us</h3>
              <div className="mt-3">
                <PartnershipDealerForm />
              </div>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}

function SectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <h2 className={`text-[28px] md:text-[32px] font-extrabold tracking-tight text-slate-900 ${className}`}>{children}</h2>;
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-[16px] leading-[24px] text-slate-600" style={{fontFamily: 'Plus Jakarta Sans Medium'}}>{label}</dt>
      <dd className="text-right text-[16px] leading-[24px] text-slate-900" style={{fontFamily: 'Plus Jakarta Sans Medium'}}>{value}</dd>
    </div>
  );
}
