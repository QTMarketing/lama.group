import Image from 'next/image';
import { notFound } from 'next/navigation';
import { type MappedPost } from '@/lib/wp';

type Params = { params: Promise<{ slug: string }> };

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60;

// Function to fetch a single post by slug using REST API
async function getPostBySlug(slug: string): Promise<MappedPost | null> {
  try {
    const url = `${process.env.NEXT_PUBLIC_WP_API}/wp/v2/posts?slug=${slug}&_embed`;
    const res = await fetch(url, { next: { revalidate: 60 } });

    if (!res.ok) {
      return null;
    }

    const posts = await res.json();
    
    if (!posts || posts.length === 0) {
      return null;
    }

    const post = posts[0];
    
    const featuredImage =
      post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.jpg';
    const category =
      post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Uncategorized';
    const authorName =
      post._embedded?.author?.[0]?.name || 'Unknown';
    const readingTime =
      post.acf?.reading_time
        ? Number(post.acf.reading_time)
        : Math.ceil((post.content?.rendered || '').replace(/<[^>]*>/g, '').split(/\s+/).length / 200);

    return {
      id: post.id,
      title: post.title?.rendered || '',
      excerpt: (post.excerpt?.rendered || '').replace(/<[^>]*>/g, ''),
      featuredImage,
      category,
      authorName,
      readingTime,
      slug: post.slug,
      content: post.content?.rendered || '',
      date: post.date,
    } as MappedPost & { content: string; date: string };
  } catch (error) {
    console.error('Failed to fetch post by slug:', error);
    return null;
  }
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return { title: 'Post Not Found' };
  }

  const description = post.excerpt.slice(0, 160);

  return {
    title: `${post.title} | LaMa Group Blog`,
    description,
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      url: `/blogs/${post.slug}`,
      images: post.featuredImage !== '/placeholder.jpg' ? [{ url: post.featuredImage }] : undefined,
    },
    alternates: { canonical: `/blogs/${post.slug}` },
  };
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  const postWithContent = post as MappedPost & { content: string; date: string };
  const formattedDate = new Date(postWithContent.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="mx-auto max-w-[1216px] px-4 py-10 md:py-14">
      {/* Cover Image */}
      <div className="relative w-full overflow-hidden rounded-[18px] bg-slate-200" style={{ aspectRatio: "16/9" }}>
        <Image 
          src={post.featuredImage} 
          alt={post.title} 
          fill 
          className="object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute left-5 right-5 bottom-5 text-white">
          <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
            {post.category}
          </span>
          <h1 className="mt-2 text-[26px] md:text-[34px] leading-tight font-extrabold">
            {post.title}
          </h1>
        </div>
      </div>

      {/* Meta Information */}
      <div className="mt-6 flex items-center gap-3 text-sm text-slate-600">
        <div className="h-8 w-8 rounded-full overflow-hidden bg-slate-200 flex items-center justify-center">
          <span className="text-xs font-semibold text-slate-500">
            {post.authorName.charAt(0).toUpperCase()}
          </span>
        </div>
        <span className="font-medium">{post.authorName}</span>
        <span>•</span>
        <span>{formattedDate}</span>
        <span>•</span>
        <span>{post.readingTime} min read</span>
      </div>

      {/* Content */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <article className="lg:col-span-8">
          <div 
            className="prose prose-slate max-w-none prose-img:rounded-[12px] prose-headings:scroll-mt-24"
            dangerouslySetInnerHTML={{ __html: postWithContent.content }}
          />
        </article>
        
        <aside className="lg:col-span-4">
          <div className="sticky top-24 space-y-6">
            {/* Author Info */}
            <div className="rounded-[14px] border border-slate-200 bg-white p-4">
              <h3 className="text-[16px] font-semibold text-slate-900 mb-3">About the Author</h3>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full overflow-hidden bg-slate-200 flex items-center justify-center">
                  <span className="text-sm font-semibold text-slate-500">
                    {post.authorName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-slate-900">{post.authorName}</div>
                  <div className="text-sm text-slate-600">LaMa Group</div>
                </div>
              </div>
            </div>

            {/* Related Posts */}
            <div className="rounded-[14px] border border-slate-200 bg-white p-4">
              <h3 className="text-[16px] font-semibold text-slate-900 mb-3">Latest Posts</h3>
              <div className="space-y-3">
                {/* This would be populated with related posts */}
                <div className="text-sm text-slate-500">
                  Related posts coming soon...
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
