import { wpRequest } from "@/lib/wpClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

const QUERY = `
  query PropertyBySlug($slug: ID!) {
    property(id: $slug, idType: SLUG) {
      title
      content
      featuredImage { node { sourceUrl } }
      price
      currency
    }
  }
`;

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const session = await getServerSession(authOptions);
  const accessToken = (session as any)?.accessToken as string | undefined;

  const data = await wpRequest<{ property: any }>(QUERY, { slug }, accessToken);
  const p = data?.property;

  if (!p) {
    return <div>Not found</div>;
  }

  const showPrice = p.price !== null && p.price !== undefined;

  return (
    <article className="bg-white rounded shadow">
      {p?.featuredImage?.node?.sourceUrl && (
        <img src={p.featuredImage.node.sourceUrl} alt={p.title} className="w-full h-64 object-cover rounded-t" />
      )}
      <div className="p-6 space-y-4">
        <h1 className="text-3xl font-bold">{p.title}</h1>
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: p.content }} />
        <div className="mt-2">
          {showPrice ? (
            <span className="text-2xl font-semibold">
              {p.currency} {Number(p.price).toLocaleString()}
            </span>
          ) : (
            <Link href={`/login?callbackUrl=/properties/${slug}`} className="px-4 py-2 rounded bg-black text-white">
              Log in to view price
            </Link>
          )}
        </div>
      </div>
    </article>
  );
} 