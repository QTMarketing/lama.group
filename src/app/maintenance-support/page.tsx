export const metadata = {
title: "Maintenance & Support | LaMa Group",
description:
"Reliable maintenance, repair, and operational support to keep your stores running.",
};
export default function MaintenanceSupportPage() {
return (
<main className="px-4">
<section className="mx-auto max-w-7xl py-14 md:py-20">
<h1 className="text-3xl md:text-5xl font-bold tracking-tight">
Maintenance & Support
</h1>
<p className="mt-4 text-slate-700 max-w-2xl">
Proactive maintenance and 24/7 support to minimize downtime and
protect your customer experience.
</p>

    <div className="mt-10 grid gap-6 sm:grid-cols-2">
      <Feature title="Preventive Maintenance Plans" />
      <Feature title="Emergency Repairs (24/7)" />
      <Feature title="Equipment Service & Replacement" />
      <Feature title="Vendor Coordination" />
    </div>

    <div className="mt-10">
      <a
        href="/contact"
        className="inline-flex items-center bg-emerald-600 text-white px-5 py-3 font-semibold hover:bg-emerald-700"
      >
        Request maintenance support
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
