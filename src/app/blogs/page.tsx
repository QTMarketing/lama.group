import FeaturedPostCard from "@/components/FeaturedPostCard";
import PostListItem from "@/components/PostListItem";
import RecentPostCard from "@/components/RecentPostCard";
import { getFeaturedPost, getOtherFeaturedPosts, getRecentPosts } from "@/lib/wp";

export const revalidate = 60;

export default async function BlogsPage() {
  const featured = await getFeaturedPost();

  if (!featured) {
    return (
      <main className="mx-auto max-w-[1216px] px-4 py-10 md:py-14">
        <h1 className="text-2xl md:text-3xl font-bold">Blogs</h1>
        <p className="mt-4 text-slate-600">No featured post yet</p>
      </main>
    );
  }

  const [otherFeatured, recent] = await Promise.all([
    getOtherFeaturedPosts(4, featured.id),
    getRecentPosts(3, [featured.id]),
  ]);

  return (
    <main className="mx-auto max-w-[1216px] px-4 py-10 md:py-14">
      {/* Top section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <FeaturedPostCard post={featured} />
        </div>
        {otherFeatured.length > 0 && (
          <aside className="lg:col-span-1">
            <h3 className="text-[16px] font-semibold text-slate-900">Other featured posts</h3>
            <div className="mt-3 rounded-[14px] border border-slate-200 bg-white divide-y">
              {otherFeatured.map((p) => (
                <PostListItem key={p.id} post={p} />
              ))}
            </div>
          </aside>
        )}
      </section>

      {/* Recent */}
      {recent.length > 0 && (
        <section className="mt-12">
          <h2 className="text-[22px] md:text-[24px] font-bold text-slate-900">Recent Posts</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {recent.map((p) => (
              <RecentPostCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      )}

      {/**
       * .env.local
       * NEXT_PUBLIC_WP_API=http://localhost:8080/wp-json
       */}
    </main>
  );
}


