import Link from "next/link";
import { wpRequest } from "@/lib/wpClient";

const LIST = `
  query ListProps {
    properties(first: 20) {
      nodes {
        slug
        title
        price
        currency
        featuredImage { node { sourceUrl } }
      }
    }
  }
`;

export default async function PropertiesPage() {
  const data = await wpRequest<{ properties: { nodes: any[] } }>(LIST);
  const items = data?.properties?.nodes ?? [];

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p) => {
        const showPrice = p.price !== null && p.price !== undefined;
        return (
          <Link key={p.slug} href={`/properties/${p.slug}`} className="block bg-white rounded shadow hover:shadow-md transition">
            {p?.featuredImage?.node?.sourceUrl && (
              <img src={p.featuredImage.node.sourceUrl} alt={p.title} className="w-full h-40 object-cover rounded-t" />
            )}
            <div className="p-4">
              <h2 className="font-semibold">{p.title}</h2>
              <div className="text-sm text-gray-600 mt-2">
                {showPrice ? (
                  <span>{p.currency} {Number(p.price).toLocaleString()}</span>
                ) : (
                  <span className="italic">Log in to view price</span>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
} 