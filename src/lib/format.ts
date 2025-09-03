export function formatSize(opts: {
  dealSlug?: string;
  acres?: number | string | null;
  sqft?: number | string | null;
}) {
  const toNum = (v: any) => {
    if (v === null || v === undefined) return undefined;
    const n = typeof v === "string" ? parseFloat(v.replace(/,/g, "")) : Number(v);
    return Number.isFinite(n) ? n : undefined;
  };

  const acres = toNum(opts.acres);
  const sqft = toNum(opts.sqft);

  if (opts.dealSlug === "for-lease") {
    if (sqft && sqft > 0) return `${Intl.NumberFormat().format(Math.round(sqft))} sq ft`;
    if (acres && acres > 0) return `${Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(acres)} acres`;
    return "—";
  }

  if (acres && acres > 0) return `${Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(acres)} acres`;
  if (sqft && sqft > 0) return `${Intl.NumberFormat().format(Math.round(sqft))} sq ft`;
  return "—";
}

export function buildGoogleEmbedNoKey(address?: string | null, zoom = 15) {
  if (!address) return null;
  const q = encodeURIComponent(address);
  return `https://www.google.com/maps?q=${q}&t=&z=${zoom}&ie=UTF8&iwloc=&output=embed`;
}
