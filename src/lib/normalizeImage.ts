export type Img = { url: string; alt?: string } | null;

export function acfImg(field: any): Img {
  if (!field) return null;
  if (typeof field === "string") return { url: field, alt: "" };
  if (field.url) return { url: field.url, alt: field.alt || "" };
  if (field.sourceUrl) return { url: field.sourceUrl, alt: field.altText || "" };
  if (field.edges?.length) {
    const node = field.edges[0]?.node;
    if (node?.sourceUrl) return { url: node.sourceUrl, alt: node.altText || "" };
  }
  return null;
}

export function chooseCardImage(node: any): Img {
  const hero = acfImg(node?.heroimage);
  if (hero) return hero;
  const wp = node?.featuredImage?.node?.sourceUrl;
  return wp ? { url: wp, alt: node?.featuredImage?.node?.altText || node?.title } : null;
}
