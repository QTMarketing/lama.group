import { wpClient } from "@/lib/wpClient";
import { LIST_PROPERTIES_TAX_FREE, TAXONOMY_TERMS } from "@/lib/queries/property-free";
import { fetchGraphQL } from "@/lib/cms";
import PropertyFilters from "@/components/PropertyFilters";
import PropertyCardExact from "@/components/PropertyCardExact";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

type Props = { searchParams: Promise<{ [k: string]: string | string[] | undefined }> };

function parseRange(v?: string) {
  if (!v) return { min: undefined, max: undefined };
  const [a, b] = v.split("-").map(Number);
  return { min: Number.isFinite(a) ? a : undefined, max: Number.isFinite(b) ? b : undefined };
}

export default async function LeasingIndex({ searchParams }: Props) {
  const params = await searchParams;
  const type   = (params.type as string) || "all";      // all | sale | lease
  const region = (params.region as string) || "";
  const q      = (params.q as string) || "";
  const price  = (params.price as string) || "";
  const size   = (params.size as string) || "";
  const sort   = (params.sort as string) || "default";

  // const dealTypes = type === "sale" ? ["for-sale"] : type === "lease" ? ["for-lease"] : [];

  const session = await getServerSession(authOptions).catch(() => null);
  const isAuthed = Boolean(session);

  let regionTerms: any[] = [];
  try {
    const terms = await wpClient.request<any>(TAXONOMY_TERMS);
    regionTerms = terms?.regions?.nodes || [];
  } catch (err) {
    console.error('Error loading store leasing (terms):', err);
  }

  // Server-side filtering for taxonomy (Tax Query)
  let items: any[] = [];
  try {
    const data = await fetchGraphQL<any>(LIST_PROPERTIES_TAX_FREE, {
      first: 60,
      after: null,
      search: q || null,
    });
    items = data?.properties?.nodes || [];
  } catch (err) {
    console.error('Error loading store leasing (list):', err);
  }

  // Client-side price/size filter and sort
  const { min: priceMin, max: priceMax } = parseRange(price);
  const { min: sizeMin,  max: sizeMax  } = parseRange(size);

  items = items.filter((n: any) => {
    // Filter by deal type
    if (type !== "all") {
      const dealType = n?.dealTypes?.nodes?.[0]?.slug;
      if (type === "sale" && dealType !== "for-sale") return false;
      if (type === "lease" && dealType !== "for-lease") return false;
    }
    
    // Filter by price and size
    const p = Number(n?.price ?? n?.acf?.price ?? NaN);
    const s = Number(n?.acf?.sizeacres ?? NaN);
    if (priceMin !== undefined && !(p >= priceMin)) return false;
    if (priceMax !== undefined && !(p <= priceMax)) return false;
    if (sizeMin  !== undefined && !(s >= sizeMin))  return false;
    if (sizeMax  !== undefined && !(s <= sizeMax))  return false;
    return true;
  });

  items.sort((a: any, b: any) => {
    const pa = Number(a?.price ?? a?.acf?.price ?? NaN);
    const pb = Number(b?.price ?? b?.acf?.price ?? NaN);
    const sa = Number(a?.acf?.sizeacres ?? NaN);
    const sb = Number(b?.acf?.sizeacres ?? NaN);
    switch (sort) {
      case "price-asc":  return (pa || Infinity) - (pb || Infinity);
      case "price-desc": return (pb || -Infinity) - (pa || -Infinity);
      case "size-asc":   return (sa || Infinity) - (sb || Infinity);
      case "size-desc":  return (sb || -Infinity) - (sa || -Infinity);
      default:           return 0;
    }
  });

  return (
    <main className="py-8">
      <div className="mx-auto w-full max-w-[1216px] px-4 sm:px-6 lg:px-8">
        <PropertyFilters
          regions={regionTerms}
          initial={{ type, region, q, price, size, sort }}
        />
        
        {items.length === 0 ? (
          <div className="mt-8 text-center py-12">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No properties found</h3>
              <p className="text-slate-600 mb-4">
                {regionTerms.length === 0 
                  ? "WordPress CMS is not running. Please start the WordPress container to see properties."
                  : "Try adjusting your search criteria or check back later."
                }
              </p>
              {regionTerms.length === 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                  <h4 className="font-medium text-blue-900 mb-2">To start WordPress:</h4>
                  <ol className="text-sm text-blue-800 space-y-1">
                    <li>1. Install Docker Desktop</li>
                    <li>2. Run: <code className="bg-blue-100 px-1 rounded">cd cms && docker compose up -d</code></li>
                    <li>3. Visit: <code className="bg-blue-100 px-1 rounded">http://localhost:8080</code></li>
                    <li>4. Create properties in WordPress Admin</li>
                  </ol>
                          </div>
                        )}
                          </div>
                        </div>
                      ) : (
          <>
            <p className="mt-4 text-sm text-slate-600">
              Showing {items.length} property{items.length !== 1 ? "ies" : ""}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-[29px]">
              {items.map((n) => <PropertyCardExact key={n.id} node={n} isAuthed={isAuthed} />)}
            </div>
          </>
        )}
        </div>
    </main>
  );
} 