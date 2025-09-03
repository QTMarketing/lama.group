export function stripHtml(html?: string) {
  if (!html) return "";
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export function readingTimeFromHtml(html?: string, wpm = 200) {
  const text = stripHtml(html);
  const words = text ? text.split(/\s+/).length : 0;
  const mins = Math.max(1, Math.round(words / wpm));
  return `${mins} min read`;
}

export function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/&amp;/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function buildHtmlWithIdsAndToc(html?: string) {
  if (!html) return { html: "", toc: [] as { id: string; text: string; level: 2 | 3 }[] };
  const toc: { id: string; text: string; level: 2 | 3 }[] = [];
  const replaced = html.replace(/<(h2|h3)>([\s\S]*?)<\/\1>/gi, (m, tag: string, inner: string) => {
    const text = stripHtml(inner);
    const id = slugify(text);
    const level = tag.toLowerCase() === "h2" ? 2 : 3;
    toc.push({ id, text, level: level as 2 | 3 });
    return `<${tag} id="${id}">${inner}</${tag}>`;
  });
  return { html: replaced, toc };
}

export function dedupeById(nodes: any[]) {
  const seen = new Set<number>();
  const out: any[] = [];
  for (const n of nodes) {
    const id = n?.databaseId;
    if (id && !seen.has(id)) { seen.add(id); out.push(n); }
  }
  return out;
}


