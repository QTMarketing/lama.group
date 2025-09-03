"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

type Term = { name: string; slug: string; count?: number };
type Props = {
  regions: Term[];
  initial: { type?: string; region?: string; q?: string; price?: string; size?: string; sort?: string; };
};

export default function PropertyFilters({ regions, initial }: Props) {
  const router = useRouter();
  const sp = useSearchParams();

  const [type, setType]     = useState(initial.type ?? "all");  // all | sale | lease
  const [region, setRegion] = useState(initial.region ?? "");
  const [q, setQ]           = useState(initial.q ?? "");
  const [price, setPrice]   = useState(initial.price ?? "");
  const [size, setSize]     = useState(initial.size ?? "");
  const [sort, setSort]     = useState(initial.sort ?? "default");

  const priceOptions = useMemo(() => [
    { v: "", l: "All Prices" },
    { v: "0-250000", l: "Up to $250k" },
    { v: "250000-500000", l: "$250k – $500k" },
    { v: "500000-1000000", l: "$500k – $1M" },
    { v: "1000000-999999999", l: "$1M+" }
  ], []);
  const sizeOptions = useMemo(() => [
    { v: "", l: "All Sizes" },
    { v: "0-1", l: "Up to 1 acre" },
    { v: "1-2", l: "1 – 2 acres" },
    { v: "2-5", l: "2 – 5 acres" },
    { v: "5-9999", l: "5+ acres" },
  ], []);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const p = new URLSearchParams(sp.toString());
    p.set("type", type);
    q ? p.set("q", q) : p.delete("q");
    region ? p.set("region", region) : p.delete("region");
    price ? p.set("price", price) : p.delete("price");
    size ? p.set("size", size) : p.delete("size");
    sort ? p.set("sort", sort) : p.delete("sort");
    p.delete("page");
    router.push(`/store-leasing?${p.toString()}`);
  }
  function onReset() { router.push("/store-leasing"); }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
      <div className="grid grid-cols-3 gap-2">
        {[
          { key: "all", label: "All Properties" },
          { key: "sale", label: "For Sale" },
          { key: "lease", label: "For Lease" },
        ].map(t => (
          <button
            key={t.key}
            type="button"
            onClick={() => {
              setType(t.key);
              // Apply the filter immediately when type is changed
              const p = new URLSearchParams(sp.toString());
              p.set("type", t.key);
              q ? p.set("q", q) : p.delete("q");
              region ? p.set("region", region) : p.delete("region");
              price ? p.set("price", price) : p.delete("price");
              size ? p.set("size", size) : p.delete("size");
              sort ? p.set("sort", sort) : p.delete("sort");
              p.delete("page");
              router.push(`/store-leasing?${p.toString()}`);
            }}
            className={`h-10 rounded-full border text-sm font-medium ${type === t.key ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit} className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <label className="block text-xs text-slate-500 mb-1">Region</label>
          <select value={region} onChange={e => setRegion(e.target.value)} className="w-full h-11 rounded-md border px-3">
            <option value="">All Regions</option>
            {regions.map(r => <option key={r.slug} value={r.slug}>{r.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-slate-500 mb-1">Price Range</label>
          <select value={price} onChange={e => setPrice(e.target.value)} className="w-full h-11 rounded-md border px-3">
            {priceOptions.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-slate-500 mb-1">Size</label>
          <select value={size} onChange={e => setSize(e.target.value)} className="w-full h-11 rounded-md border px-3">
            {sizeOptions.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-slate-500 mb-1">Sort By</label>
          <select value={sort} onChange={e => setSort(e.target.value)} className="w-full h-11 rounded-md border px-3">
            <option value="default">Default Order</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="size-asc">Size: Small to Large</option>
            <option value="size-desc">Size: Large to Small</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-slate-500 mb-1">Search Properties</label>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search by address..." className="w-full h-11 rounded-md border px-3" />
        </div>
        <div className="col-span-full mt-1 flex gap-3">
          <button className="flex-1 h-11 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700">Search</button>
          <button type="button" onClick={onReset} className="w-40 h-11 rounded-md bg-slate-200 text-slate-800 font-semibold hover:bg-slate-300">Reset</button>
        </div>
      </form>
    </div>
  );
}
