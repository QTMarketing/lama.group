// Centralized CMS helpers with strict env validation and build-time logs

// Debug at import time (appears in build logs)
// eslint-disable-next-line no-console
console.log('NEXT_PUBLIC_WP_API:', process.env.NEXT_PUBLIC_WP_API);
// eslint-disable-next-line no-console
console.log('NEXT_PUBLIC_WP_GRAPHQL_URL:', process.env.NEXT_PUBLIC_WP_GRAPHQL_URL);
console.log('WP_GRAPHQL_URL (server):', process.env.WP_GRAPHQL_URL);

const REST_BASE = process.env.NEXT_PUBLIC_WP_API!;
if (!REST_BASE) throw new Error('NEXT_PUBLIC_WP_API is not defined');

const GRAPHQL_URL = (process.env.WP_GRAPHQL_URL || process.env.NEXT_PUBLIC_WP_GRAPHQL_URL)!;
if (!GRAPHQL_URL) throw new Error('Missing GraphQL URL (set WP_GRAPHQL_URL or NEXT_PUBLIC_WP_GRAPHQL_URL)');

const HEADLESS_KEY = process.env.NEXT_PUBLIC_WP_HEADLESS_API_KEY!;
if (!HEADLESS_KEY) throw new Error('NEXT_PUBLIC_WP_HEADLESS_API_KEY is not defined');

export async function fetchREST(path: string, init?: RequestInit) {
  const url = path.startsWith('http')
    ? path
    : `${REST_BASE}${path.startsWith('/') ? '' : '/'}${path}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      'x-headless-api-key': HEADLESS_KEY,
    },
    next: init?.next ?? { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`WP REST fetch failed: ${res.status}`);
  return res.json();
}

export async function fetchGraphQL<T = any>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  if (!query) {
    throw new Error('fetchGraphQL was called without a query string');
  }
  const res = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-headless-api-key': HEADLESS_KEY,
    },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`GraphQL fetch failed: ${res.status} ${errText}`);
  }
  const { data, errors } = await res.json();
  if (errors) {
    // eslint-disable-next-line no-console
    console.error('GraphQL errors:', errors);
    throw new Error('GraphQL returned errors; check console');
  }
  return data as T;
}

export { REST_BASE, GRAPHQL_URL };


