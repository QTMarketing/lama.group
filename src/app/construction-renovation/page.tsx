export const metadata = {
title: "Construction & Renovation | LaMa Group",
description:
"Ground-up builds, remodels, and turnkey renovations for convenience retail and fuel sites.",
};
export default function ConstructionRenovationPage() {
return (
<main className="px-4">
<section className="mx-auto max-w-7xl py-14 md:py-20">
<h1 className="text-3xl md:text-5xl font-bold tracking-tight">
Construction & Renovation
</h1>
<p className="mt-4 text-slate-700 max-w-2xl">
From ground-up construction to remodels and rebranding, we deliver
compliant, on-time, and cost-effective projects for retail,
wholesale, and fuel sites.
</p>

    <div className="mt-10 grid gap-6 sm:grid-cols-2">
      <Feature title="Ground-up Builds" />
      <Feature title="Store Remodels & Rebrands" />
      <Feature title="Permitting & Compliance" />
      <Feature title="General Contracting" />
    </div>

    <div className="mt-10">
      <a
        href="/contact"
        className="inline-flex items-center bg-emerald-600 text-white px-5 py-3 font-semibold hover:bg-emerald-700"
      >
        Schedule a project consult
      </a>
    </div>
  </section>
</main>
);
}

function Feature({ title }: { title: string }) {
return (
<div className="border border-slate-200 p-5">
<h3 className="font-semibold">{title}</h3>
<p className="mt-2 text-slate-600 text-sm">
Replace with your specific offering and value.
</p>
</div>
);
}
