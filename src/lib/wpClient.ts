import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.WP_GRAPHQL_URL!;

export const wpClient = new GraphQLClient(endpoint, {
  headers: {
    'X-Headless-API-Key': process.env.NEXT_PUBLIC_WP_HEADLESS_API_KEY!,
  },
  // no caching or use cache: 'no-store' in Next.js fetch calls
});

type Vars = Record<string, any>;

export async function wpRequest<T>(query: string, variables?: Vars, token?: string): Promise<T> {
  try {
    const headers: HeadersInit = { 
      "Content-Type": "application/json",
      'X-Headless-API-Key': process.env.NEXT_PUBLIC_WP_HEADLESS_API_KEY!,
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    const res = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({ query, variables }),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`WPGraphQL HTTP ${res.status}: ${await res.text()}`);
    const json = await res.json();
    if (json.errors) throw new Error(`WPGraphQL errors: ${JSON.stringify(json.errors)}`);
    return json.data as T;
  } catch (error) {
    console.error('WordPress GraphQL request failed:', error);
    // Return empty data structure to prevent crashes
    return {
      properties: { nodes: [] },
      regions: { nodes: [] },
      dealTypes: { nodes: [] },
      property: null
    } as T;
  }
}

export default wpRequest;