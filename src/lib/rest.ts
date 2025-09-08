export const REST_API_BASE = process.env.NEXT_PUBLIC_WP_API!;

export async function fetchBlogPosts() {
  const res = await fetch(
    `${REST_API_BASE}/wp/v2/posts?headless_key=${process.env.NEXT_PUBLIC_WP_HEADLESS_API_KEY}`
  );
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

export async function fetchPostBySlug(slug: string) {
  const res = await fetch(
    `${REST_API_BASE}/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed=1&per_page=1&headless_key=${process.env.NEXT_PUBLIC_WP_HEADLESS_API_KEY}`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) return null;
  const data = await res.json();
  return Array.isArray(data) && data[0] ? data[0] : null;
}

export async function fetchWithHeadlessKey(url: string, options: RequestInit = {}) {
  const urlWithKey = new URL(url);
  urlWithKey.searchParams.set('headless_key', process.env.NEXT_PUBLIC_WP_HEADLESS_API_KEY!);
  
  return fetch(urlWithKey.toString(), {
    ...options,
    headers: {
      'X-Headless-API-Key': process.env.NEXT_PUBLIC_WP_HEADLESS_API_KEY!,
      ...options.headers,
    },
  });
}
