import { wpRequest } from "@/lib/wpClient";
import { FEATURED_POSTS, HOME_POSTS } from "@/lib/queries/posts";
import Image from "next/image";
import Link from "next/link";
import { readingTimeFromHtml } from "@/lib/blog";

function CategoryChip({ name }: { name?: string }) {
  if (!name) return null;
  return (
    <span className="inline-flex rounded-full bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1">
      {name.toUpperCase()}
    </span>
  );
}

function TrendingCard({ post }: { post: any }) {
  const img = post?.featuredImage?.node?.sourceUrl;
  const cat = post?.categories?.nodes?.[0]?.name;
  const rt = readingTimeFromHtml(post?.content);
  
  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <div className="relative w-full overflow-hidden rounded-[18px] bg-slate-200" style={{ aspectRatio: "16/9" }}>
        {img && (
          <Image
            src={img}
            alt={post?.featuredImage?.node?.altText || post.title}
            fill
            className="object-cover"
          />
        )}
      </div>
      <div className="mt-3 flex items-center gap-3 text-xs text-slate-600">
        <CategoryChip name={cat} />
        <span>{rt}</span>
      </div>
      <h3 className="mt-1 text-[20px] leading-[28px] font-semibold text-slate-900">{post.title}</h3>
      {post?.excerpt && (
        <p className="mt-1 text-[14px] leading-[22px] text-slate-600 line-clamp-2" 
           dangerouslySetInnerHTML={{ __html: post.excerpt }} />
      )}
    </Link>
  );
}

function LatestListItem({ post }: { post: any }) {
  const cat = post?.categories?.nodes?.[0]?.name;
  const rt = readingTimeFromHtml(post?.content);
  
  return (
    <Link href={`/blog/${post.slug}`} className="block py-3 border-t first:border-t-0 border-slate-200">
      <div className="text-[11px] font-semibold text-slate-500">{cat?.toUpperCase()}</div>
      <div className="mt-0.5 text-[15px] leading-[22px] text-slate-900 font-medium line-clamp-2">
        {post.title}
      </div>
      <div className="text-[12px] text-slate-600 mt-0.5">{rt}</div>
    </Link>
  );
}

export default async function HomeBlogs() {
  const [featuredData, latestData] = await Promise.all([
    wpRequest<any>(FEATURED_POSTS, { first: 6 }).catch(() => ({ posts: { nodes: [] } })),
    wpRequest<any>(HOME_POSTS, { first: 6 }).catch(() => ({ posts: { nodes: [] } })),
  ]);

  const featured = featuredData?.posts?.nodes || [];
  const latest = latestData?.posts?.nodes || [];

  // Pick 2 trending: prefer featured, else newest
  const trending = featured.length >= 2 ? featured.slice(0, 2) : latest.slice(0, 2);
  
  // Latest list: take remaining from latest that aren't in trending
  const trendingIds = new Set(trending.map((p: any) => p.databaseId));
  const latestList = latest.filter((p: any) => !trendingIds.has(p.databaseId)).slice(0, 3);

  if (!trending.length && !latestList.length) return null;

  return (
    <section className="mx-auto max-w-[1216px] px-4 py-12">
      <div className="flex items-center justify-between">
        <h2 className="text-[28px] md:text-[32px] font-extrabold tracking-tight">Blogs</h2>
        <Link 
          href="/blog" 
          className="inline-flex items-center rounded-full bg-orange-500 text-white text-sm px-4 py-2 hover:bg-orange-600"
        >
          Learn More
        </Link>
      </div>

      <div className="mt-2 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 grid sm:grid-cols-2 gap-8">
          {trending.map((p: any) => (
            <TrendingCard key={p.id} post={p} />
          ))}
        </div>
        <aside className="lg:col-span-4">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-slate-100 text-slate-700 text-xs font-semibold px-2 py-1">
              LATEST NEWS
            </span>
          </div>
          <div className="mt-2 rounded-[14px] border border-slate-200 bg-white p-2">
            {latestList.map((p: any) => (
              <LatestListItem key={p.id} post={p} />
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
