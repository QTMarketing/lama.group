import { wpClient } from "@/lib/wpClient";
import { POST_BY_SLUG, RELATED_POSTS } from "@/lib/queries/posts";
import Image from "next/image";
import { readingTimeFromHtml, formatDate, buildHtmlWithIdsAndToc, stripHtml } from "@/lib/blog";
import { notFound } from "next/navigation";
// import PostCard from "@/components/PostCard";
import ArticleAside from "@/components/ArticleAside";

type Params = { params: Promise<{ slug: string }> };

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60;

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const data = await wpClient.request<any>(POST_BY_SLUG, { slug }).catch(() => null);
  const post = data?.post;
  if (!post) return { title: "Blog" };

  const title = post.title;
  const description = post.excerpt ? stripHtml(post.excerpt).slice(0, 160) : stripHtml(post.content).slice(0, 160);
  const image = post?.featuredImage?.node?.sourceUrl;

  return {
    title: `${title} | Blog`,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `/blog/${post.slug}`,
      images: image ? [{ url: image }] : undefined,
    },
    alternates: { canonical: `/blog/${post.slug}` },
  } as any;
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const data = await wpClient.request<any>(POST_BY_SLUG, { slug }).catch(() => null);
  const post = data?.post;
  if (!post) return notFound();

  const img = post?.featuredImage?.node?.sourceUrl;
  const cat = post?.categories?.nodes?.[0];
  const author = post?.author?.node;
  const contributors = undefined as any; // remove until ACF field exists

  const { html, toc } = buildHtmlWithIdsAndToc(post?.content || "");
  const rt = readingTimeFromHtml(post?.content);
  const dateStr = formatDate(post?.date);

  const relatedData = cat
    ? await wpClient.request<any>(RELATED_POSTS, { first: 3, category: cat.name, exclude: [post.databaseId] }).catch(() => null)
    : null;
  const related = relatedData?.posts?.nodes || [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    image: img ? [img] : undefined,
    datePublished: post.date,
    author: [{ "@type": "Person", name: author?.name || "LaMa Group" }],
    publisher: { "@type": "Organization", name: "LaMa Group" },
    mainEntityOfPage: { "@type": "WebPage", "@id": `/blog/${post.slug}` },
    description: post.excerpt ? stripHtml(post.excerpt) : stripHtml(post.content).slice(0, 160),
  } as any;

  return (
    <main className="mx-auto max-w-[1216px] px-4 py-10 md:py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Cover */}
      <div className="relative w-full overflow-hidden rounded-[18px] bg-slate-200" style={{ aspectRatio: "16/9" }}>
        {img && <Image src={img} alt={post?.featuredImage?.node?.altText || post.title} fill className="object-cover" />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute left-5 right-5 bottom-5 text-white">
          {cat?.name && <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">{cat.name}</span>}
          <h1 className="mt-2 text-[26px] md:text-[34px] leading-tight font-extrabold">{post.title}</h1>
        </div>
      </div>

      {/* Meta */}
      <div className="mt-6 flex items-center gap-3 text-sm text-slate-600">
        <div className="h-8 w-8 rounded-full overflow-hidden bg-slate-200">
          {author?.avatar?.url && <Image src={author.avatar.url} alt={author?.name || ""} width={32} height={32} />}
        </div>
        <span className="font-medium">{author?.name || "—"}</span>
        <span>•</span>
        <span>{dateStr}</span>
        <span>•</span>
        <span>{rt}</span>
      </div>

      {/* Content + Sidebar */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <article className="lg:col-span-8">
          <div className="prose prose-slate max-w-none prose-img:rounded-[12px] prose-headings:scroll-mt-24" dangerouslySetInnerHTML={{ __html: html }} />
          {/* Related */}
          {related.length > 0 && (
            <section className="mt-10">
              <h3 className="text-[18px] font-semibold text-slate-900">Related Posts</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p: any) => (
                  <a key={p.id} href={`/blog/${p.slug}`} className="block rounded-[14px] border border-slate-200 overflow-hidden bg-white hover:shadow-md">
                    <div className="relative bg-slate-200" style={{ aspectRatio: "16/9" }}>
                      {p?.featuredImage?.node?.sourceUrl && (
                        <Image src={p.featuredImage.node.sourceUrl} alt={p?.featuredImage?.node?.altText || p.title} fill className="object-cover" />
                      )}
                    </div>
                    <div className="p-3">
                      <div className="text-[13px] text-slate-500">{p?.categories?.nodes?.[0]?.name}</div>
                      <div className="mt-1 text-[15px] font-medium text-slate-900 line-clamp-2">{p.title}</div>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}
        </article>
        <div className="lg:col-span-4">
          <ArticleAside toc={toc} author={author} contributors={contributors} />
        </div>
      </div>
    </main>
  );
}


