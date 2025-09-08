import { wpClient } from "@/lib/wpClient";
import { POSTS_INDEX_PAGED, FEATURED_POSTS } from "@/lib/queries/posts";
import BlogHero from "@/components/BlogHero";
import PostCard from "@/components/PostCard";
import FeaturedListItem from "@/components/FeaturedListItem";

export const metadata = {
  title: "Blog | LaMa Group",
  description: "Latest articles and company stories.",
};

type Props = { searchParams: Promise<{ after?: string }> };

export default async function BlogIndexPage({ searchParams }: Props) {
  const { after } = await searchParams;

  const [featuredData, recentData] = await Promise.all([
    wpClient.request<any>(FEATURED_POSTS, { first: 6 }).catch(() => ({ posts: { nodes: [] } })),
    wpClient.request<any>(POSTS_INDEX_PAGED, { first: 12, after }).catch(() => ({ posts: { nodes: [], pageInfo: {} } })),
  ]);

  const featured = featuredData?.posts?.nodes || [];
  const hero = featured[0] || null;
  const side = featured.slice(1, 6);

  const recent = recentData?.posts?.nodes || [];
  const pageInfo = recentData?.posts?.pageInfo || {};

  return (
    <main className="mx-auto max-w-[1216px] px-4 py-10 md:py-14">
      {/* Featured band */}
      {hero && (
        <section className="grid grid-cols-1 md:grid-cols-12 md:gap-6 items-start">
          <div className="md:col-span-8"><BlogHero post={hero} /></div>
          <aside className="md:col-span-4 mt-6 md:mt-0">
            <h3 className="text-[16px] font-semibold text-slate-900">Other featured posts</h3>
            <div className="mt-3 rounded-[14px] border border-slate-200 bg-white divide-y">
              {side.map((p: any) => (<FeaturedListItem key={p.id} post={p} />))}
            </div>
          </aside>
        </section>
      )}

      {/* Recent posts grid */}
      <section className="mt-10 md:mt-14">
        <div className="flex items-center justify-between">
          <h2 className="text-[22px] md:text-[24px] font-bold text-slate-900">Recent Posts</h2>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recent.map((p: any) => (<PostCard key={p.id} post={p} />))}
        </div>

        {pageInfo?.hasNextPage && (
          <div className="mt-8 flex justify-center">
            <a
              href={`/blog?after=${encodeURIComponent(pageInfo.endCursor)}`}
              className="inline-flex items-center rounded-[10px] border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              Load more
            </a>
          </div>
        )}
      </section>
    </main>
  );
}


