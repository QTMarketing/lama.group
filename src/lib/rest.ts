const BASE = process.env.NEXT_PUBLIC_WP_API!;
if (!BASE) throw new Error('NEXT_PUBLIC_WP_API is not defined');

const headlessApiKey = process.env.NEXT_PUBLIC_WP_HEADLESS_API_KEY!;
if (!headlessApiKey) throw new Error('NEXT_PUBLIC_WP_HEADLESS_API_KEY is not defined');

export const REST_API_BASE = BASE;

export async function fetchBlogPosts() {
  const res = await fetch(
    `${BASE}/wp/v2/posts?headless_key=${headlessApiKey}`
  );
  if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`);
  return res.json();
}

export async function fetchPostBySlug(slug: string) {
  const res = await fetch(
    `${BASE}/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed=1&per_page=1&headless_key=${headlessApiKey}`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) return null;
  const data = await res.json();
  return Array.isArray(data) && data[0] ? data[0] : null;
}

export async function fetchWithHeadlessKey(url: string, options: RequestInit = {}) {
  const urlWithKey = new URL(url);
  urlWithKey.searchParams.set('headless_key', headlessApiKey);
  
  return fetch(urlWithKey.toString(), {
    ...options,
    headers: {
      'X-Headless-API-Key': headlessApiKey,
      ...options.headers,
    },
  });
}

// Fetch a Property CPT by slug via REST (to access ACF when not exposed in GraphQL)
export async function fetchPropertyBySlugREST(slug: string) {
  const url = `${BASE}/wp/v2/property?slug=${encodeURIComponent(slug)}&_embed=1`;
  const res = await fetchWithHeadlessKey(url);
  if (!res.ok) return null;
  const arr = await res.json();
  return Array.isArray(arr) && arr[0] ? arr[0] : null;
}
