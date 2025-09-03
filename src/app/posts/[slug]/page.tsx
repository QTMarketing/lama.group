import Image from "next/image";
import Link from "next/link";

export const revalidate = 60;

async function fetchPostBySlug(slug: string) {
  const base = process.env.NEXT_PUBLIC_WP_API || "http://localhost:8080/wp-json";
  const url = `${base}/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed=1&per_page=1`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) return null;
  const data = await res.json();
  return Array.isArray(data) && data[0] ? data[0] : null;
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);
  if (!post) {
    return (
      <main className="mx-auto max-w-[920px] px-4 py-10">
        <p className="text-slate-600">Post not found.</p>
        <Link href="/blogs" className="text-indigo-600 underline">Back to Blogs</Link>
      </main>
    );
  }

  const embedded = post._embedded || {};
  const media = embedded["wp:featuredmedia"]?.[0];
  const author = embedded.author?.[0];
  const img = media?.source_url || "";
  const title = post?.title?.rendered || "Untitled";
  const date = post?.date || "";

  return (
    <main className="mx-auto max-w-[920px] px-4 py-10">
      <Link href="/blogs" className="text-indigo-600 underline">← Back to Blogs</Link>
      <h1 className="mt-2 text-3xl font-bold text-slate-900" dangerouslySetInnerHTML={{ __html: title }} />
      <div className="mt-2 text-sm text-slate-600">
        By {author?.name || "—"} • {new Date(date).toLocaleDateString()}
      </div>
      {img && (
        <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden bg-slate-200 mt-4">
          <Image src={img} alt={media?.alt_text || ""} fill className="object-cover" />
        </div>
      )}
      <article className="prose prose-slate mt-6 max-w-none" dangerouslySetInnerHTML={{ __html: post?.content?.rendered || "" }} />
    </main>
  );
}


