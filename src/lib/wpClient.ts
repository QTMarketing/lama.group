export async function wpRequest<T>(
  query: string,
  variables: Record<string, any> = {},
  accessToken?: string
): Promise<T> {
  const res = await fetch(`${process.env.WP_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });
  const json = await res.json();
  if (json.errors) {
    throw new Error(JSON.stringify(json.errors));
  }
  return json.data as T;
} 