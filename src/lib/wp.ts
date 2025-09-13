export type MappedPost = {
  id: number;
  title: string;
  excerpt: string;
  featuredImage: string;
  category: string;
  authorName: string;
  readingTime: number;
  slug: string;
};

const API_BASE = process.env.NEXT_PUBLIC_WP_API!;
if (!API_BASE) throw new Error('NEXT_PUBLIC_WP_API is not defined');

function wpUrl(path: string, params?: Record<string, string | number | boolean | undefined>) {
  const url = new URL(path.replace(/^\//, ""), API_BASE.endsWith("/") ? API_BASE : API_BASE + "/");
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
    });
  }
  return url.toString();
}

export function stripHtml(html: string) {
  return (html || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export function computeReadingTime(text: string) {
  const words = (text || "").trim() ? stripHtml(text).split(/\s+/).length : 0;
  return Math.max(1, Math.round(words / 200));
}

export function mapPost(p: any): MappedPost {
  const embedded = p?._embedded || {};
  const featuredMedia = embedded["wp:featuredmedia"]?.[0];
  const terms = embedded["wp:term"]?.[0] || [];
  const firstCategory = Array.isArray(terms) ? terms[0] : undefined;
  const author = embedded?.author?.[0];
  const acfReadingTime = (p as any)?.acf?.reading_time;

  const featuredImage = featuredMedia?.source_url || "/placeholder.jpg";
  const authorName = author?.name || "—";
  const category = firstCategory?.name || "";
  const title = p?.title?.rendered || "Untitled";
  const excerptHtml = p?.excerpt?.rendered || "";
  const contentHtml = p?.content?.rendered || "";

  const readingTime = typeof acfReadingTime === "number" && acfReadingTime > 0
    ? acfReadingTime
    : computeReadingTime(contentHtml || excerptHtml);

  return {
    id: Number(p?.id || 0),
    title,
    excerpt: stripHtml(excerptHtml),
    featuredImage,
    category,
    authorName,
    readingTime,
    slug: p?.slug || String(p?.id || "")
  } as MappedPost;
}

async function fetchJson(path: string, params?: Record<string, any>) {
  if (!API_BASE) {
    throw new Error('WordPress API is not configured');
  }
  
  const url = wpUrl(path, params);
  const res = await fetch(url, { 
    next: { revalidate: 60 },
    signal: AbortSignal.timeout(10000) // 10 second timeout
  });
  if (!res.ok) throw new Error(`WP REST ${res.status}: ${await res.text()}`);
  return res.json();
}

async function resolveFeaturedCategoryId(): Promise<number | null> {
  try {
    const cats = await fetchJson("wp/v2/categories", { slug: "featured", per_page: 1 });
    return cats?.[0]?.id ?? null;
  } catch {
    return null;
  }
}

export async function getFeaturedPost(): Promise<MappedPost | null> {
  // Try meta featured=true first
  try {
    const byMeta = await fetchJson("wp/v2/posts", {
      _embed: 1,
      per_page: 1,
      orderby: "date",
      order: "desc",
      meta_key: "featured",
      meta_value: "true",
      status: "publish",
    });
    if (Array.isArray(byMeta) && byMeta.length) return mapPost(byMeta[0]);
  } catch {
    // ignore
  }

  // Fallback to category "featured"
  const catId = await resolveFeaturedCategoryId();
  if (!catId) return null;
  const byCat = await fetchJson("wp/v2/posts", {
    _embed: 1,
    per_page: 1,
    orderby: "date",
    order: "desc",
    categories: catId,
    status: "publish",
  });
  if (Array.isArray(byCat) && byCat.length) return mapPost(byCat[0]);
  return null;
}

export async function getOtherFeaturedPosts(limit: number, excludeId: number): Promise<MappedPost[]> {
  const out: MappedPost[] = [];
  try {
    const byMeta = await fetchJson("wp/v2/posts", {
      _embed: 1,
      per_page: limit,
      orderby: "date",
      order: "desc",
      meta_key: "featured",
      meta_value: "true",
      exclude: excludeId || undefined,
      status: "publish",
    });
    if (Array.isArray(byMeta) && byMeta.length) {
      return byMeta.filter((p: any) => p?.id !== excludeId).map(mapPost).slice(0, limit);
    }
  } catch {
    // ignore
  }

  const catId = await resolveFeaturedCategoryId();
  if (!catId) return out;
  const byCat = await fetchJson("wp/v2/posts", {
    _embed: 1,
    per_page: limit,
    orderby: "date",
    order: "desc",
    categories: catId,
    exclude: excludeId || undefined,
    status: "publish",
  });
  return Array.isArray(byCat) ? byCat.map(mapPost).slice(0, limit) : out;
}

export async function getRecentPosts(limit: number, excludeIds: number[] = []): Promise<MappedPost[]> {
  const recent = await fetchJson("wp/v2/posts", {
    _embed: 1,
    per_page: limit + (excludeIds?.length ? excludeIds.length : 0),
    orderby: "date",
    order: "desc",
    status: "publish",
  });
  const ids = new Set(excludeIds || []);
  const mapped = (Array.isArray(recent) ? recent : []).map(mapPost).filter(p => !ids.has(p.id));
  return mapped.slice(0, limit);
}

// New function specifically for homepage blog section
export async function getRecentPostsForHomepage(limit: number): Promise<MappedPost[]> {
  try {
    // Check if API_BASE is available
    if (!API_BASE) {
      console.warn('NEXT_PUBLIC_WP_API is not configured, returning empty array');
      return [];
    }

    const url = `${API_BASE}/wp/v2/posts?_embed&per_page=${limit}`;
    const res = await fetch(url, { 
      next: { revalidate: 60 },
      // Add timeout to prevent hanging
      signal: AbortSignal.timeout(10000) // 10 second timeout
    });

    if (!res.ok) {
      console.error(`WordPress API returned ${res.status}: ${res.statusText}`);
      throw new Error(`Failed to fetch posts: ${res.status}`);
    }

    const posts = await res.json();

    if (!Array.isArray(posts)) {
      console.error('WordPress API returned invalid data format');
      return [];
    }

    return posts.map((post: any) => mapPost(post));
  } catch (error) {
    console.error('Failed to fetch recent posts for homepage:', error);
    
    // Return empty array instead of throwing to prevent app crashes
    // The HomepageBlog component will handle the fallback
    return [];
  }
}


