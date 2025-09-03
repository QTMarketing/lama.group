export const WP_GRAPHQL_URL = process.env.WP_GRAPHQL_URL!;

type Vars = Record<string, any>;

export async function wpRequest<T>(query: string, variables?: Vars, token?: string): Promise<T> {
  try {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    const res = await fetch(WP_GRAPHQL_URL, {
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