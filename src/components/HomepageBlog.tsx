import Link from 'next/link';
import Image from 'next/image';
import { getRecentPostsForHomepage, type MappedPost } from '@/lib/wp';

// Fallback data for when API fails
const fallbackPosts: MappedPost[] = [
  {
    id: 1,
    title: "Carbon Capture Innovations Transforming Retail Energy",
    excerpt: "Exploring next-gen carbon capture and storage solutions designed for scalable deployment across c-store networks.",
    featuredImage: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=1200&auto=format&fit=crop",
    category: "Sustainability",
    authorName: "LaMa Team",
    readingTime: 3,
    slug: "carbon-capture-innovations"
  },
  {
    id: 2,
    title: "AI Workflows Boost Uptime Across Fuel & Retail",
    excerpt: "From predictive maintenance to dynamic pricing—how AI delivers measurable ROI in multi-location environments.",
    featuredImage: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop",
    category: "Operations",
    authorName: "LaMa Team",
    readingTime: 5,
    slug: "ai-workflows-boost-uptime"
  }
];

export default async function HomepageBlog() {
  let posts: MappedPost[] = [];
  let isFallback = false;

  try {
    posts = await getRecentPostsForHomepage(3);
    
    // If no posts were returned (API not available or no posts), use fallback
    if (!posts || posts.length === 0) {
      posts = fallbackPosts.slice(0, 3);
      isFallback = true;
    }
  } catch (err) {
    console.error('Homepage blog fetch failed:', err);
    posts = fallbackPosts.slice(0, 3);
    isFallback = true;
  }

  return (
    <section aria-labelledby="blogs-heading" className="w-full bg-white text-[#111] py-20">
      <div className="mx-auto max-w-[1680px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <h2 id="blogs-heading" className="text-4xl md:text-5xl font-extrabold tracking-tight">Blogs</h2>
          <div className="flex items-center gap-4">
            <span className="inline-block text-sm uppercase tracking-wide text-[#FF4D4D] bg-[#FF4D4D]/10 px-3 py-1 rounded-full border border-[#FF4D4D]/20">
              Latest News
            </span>
            <Link 
              href="/blogs" 
              className="inline-flex items-center px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Learn More
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Trending Topics (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <h3 className="text-xl font-semibold text-[#1A1A1A]">Trending Topics</h3>

            {/* Medium Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.slice(0, 2).map((post) => (
                <Link 
                  key={post.id} 
                  href={`/blogs/${post.slug}`} 
                  className="group overflow-hidden rounded-2xl border border-black/10 bg-white hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      width={600}
                      height={450}
                      className="w-full aspect-[4/3] object-cover transform transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs font-medium mb-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#00FFA3]/15 text-[#0F766E] border border-[#00FFA3]/30">
                        {post.category}
                      </span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-600">{post.readingTime} min read</span>
                    </div>
                    <h4 className="text-lg md:text-xl font-bold text-[#111] leading-snug">
                      {post.title}
                    </h4>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Latest News (4 cols) */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-4">
              <h3 className="text-xl font-semibold text-[#1A1A1A]">Latest News</h3>
              <ul className="space-y-3">
                {posts.slice(2).map((post) => (
                  <li key={post.id}>
                    <Link 
                      href={`/blogs/${post.slug}`} 
                      className="block rounded-xl border border-black/10 bg-white hover:bg-black/[0.02] transition-all duration-200 p-4"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#0F766E] mt-1">
                          {post.category}
                        </span>
                        <div className="flex-1">
                          <p className="text-sm md:text-base font-semibold text-[#111] line-clamp-2">
                            {post.title}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">{post.readingTime} min read</p>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {/* Fallback indicator (only shown in development) */}
        {isFallback && process.env.NODE_ENV === 'development' && (
          <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
            <p className="text-sm text-yellow-800">
              ⚠️ Using fallback blog data - WordPress API unavailable
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
