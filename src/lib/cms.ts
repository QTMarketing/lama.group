// Centralized CMS helpers with strict env validation

const CMS_BASE = process.env.NEXT_PUBLIC_CMS_URL!;
if (!CMS_BASE) throw new Error('Missing NEXT_PUBLIC_CMS_URL');

const WP_REST_BASE = process.env.NEXT_PUBLIC_WP_API || `${CMS_BASE.replace(/\/$/, '')}/wp-json`;
if (!WP_REST_BASE) throw new Error('NEXT_PUBLIC_WP_API is not defined');

const WP_GRAPHQL_URL = process.env.WP_GRAPHQL_URL!; // server-only
if (!WP_GRAPHQL_URL) throw new Error('WP_GRAPHQL_URL is not defined');

const HEADLESS_KEY = process.env.NEXT_PUBLIC_WP_HEADLESS_API_KEY!;
if (!HEADLESS_KEY) throw new Error('NEXT_PUBLIC_WP_HEADLESS_API_KEY is not defined');

export { CMS_BASE, WP_REST_BASE as REST_BASE, WP_GRAPHQL_URL };

export async function fetchWP(path: string, init?: RequestInit) {
  const url = path.startsWith('http')
    ? path
    : `${WP_REST_BASE}${path.startsWith('/') ? '' : '/'}${path}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      'X-Headless-API-Key': HEADLESS_KEY,
    },
    next: init?.next ?? { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`WP REST fetch failed: ${res.status}`);
  return res.json();
}

type GraphQLRequestOptions = {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
};

export async function fetchGraphQL<T = any>({ query, variables, cache }: GraphQLRequestOptions): Promise<T> {
  const res = await fetch(WP_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Headless-API-Key': HEADLESS_KEY,
    },
    body: JSON.stringify({ query, variables }),
    cache: cache ?? 'no-store',
  });
  if (!res.ok) throw new Error(`GraphQL fetch failed: ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
  return json.data as T;
}


