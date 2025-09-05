"use client";

import { useRouter } from "next/navigation";

type Service = {
  title: string;
  email: string;
  description: string;
};

const services: Service[] = [
  {
    title: "Store Leasing & Management",
    email: "Susanna@quicktrackinc.com",
    description: "Maximize occupancy and optimize store operations with expert leasing and management.",
  },
  {
    title: "Fuel Branding & Supply",
    email: "sandy.malla@quicktrackinc.com",
    description: "End-to-end brand strategy and reliable supply partnerships for your fuel business.",
  },
  {
    title: "Wholesale Distribution",
    email: "shakil@quicktrackinc.com",
    description: "Scale your retail with our high-velocity wholesale distribution network.",
  },
  {
    title: "Construction & Renovation",
    email: "ram@quicktrackinc.com",
    description: "From ground-up builds to high-impact remodels delivered on time and on budget.",
  },
];

export default function HeroSlider() {
  const router = useRouter();
  return (
    <section className="w-full py-10 sm:py-14 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">How can we help you grow?</h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((s) => (
            <article key={s.title} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm flex flex-col">
              <h3 className="text-lg font-semibold text-gray-900">{s.title}</h3>
              <p className="mt-2 text-sm text-gray-600 flex-1">{s.description}</p>
              <button
                onClick={() => router.push(`/book?service=${encodeURIComponent(s.title)}&email=${encodeURIComponent(s.email)}`)}
                className="mt-4 inline-flex justify-center items-center rounded-md bg-[#f97316] px-4 py-2 text-white hover:bg-orange-600 transition-colors"
              >
                Book a Strategy Session
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


