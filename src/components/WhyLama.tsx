import Link from "next/link";
import { TbArrowRight } from "react-icons/tb";

type Item = {
  value: string;
  title: string;
  desc: string;
};

const ITEMS: Item[] = [
  {
    value: "20+",
    title: "Years of Experience",
    desc: "Decades of hands-on leasing, fuel, wholesale, and store operations.",
  },
  {
    value: "Fastest Growing",
    title: "Chain of Convenience Store",
    desc: "Expanding footprint powered by a proven, scalable playbook.",
  },
  {
    value: "$0",
    title: "Good Will Fee",
    desc: "Transparent, growth-friendly economics—keep more capital working.",
  },
  {
    value: "Best",
    title: "Back Office Support",
    desc: "Accounting, compliance, vendor coordination, and more.",
  },
];

export default function WhyLama() {
  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      <div className="mx-auto" style={{ maxWidth: '1616px' }}>
        {/* subtle background flare (optional) */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-10 h-40 -z-10 bg-gradient-to-b from-slate-200/70 to-transparent blur-2xl" />
        
        <div className="rounded-[28px] bg-white shadow-xl ring-1 ring-black/5 px-5 py-6 sm:px-8 sm:py-8 md:px-12 md:py-10">
          {/* Header row */}
          <div className="flex flex-col gap-5 sm:gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-[26px] sm:text-[30px] md:text-[34px] font-bold tracking-tight text-slate-900">
                Why LaMa
              </h2>
              <p className="mt-2 max-w-2xl text-slate-600 text-[14px] sm:text-[15px]">
                A trusted growth partner for convenience retail—built on execution,
                transparency, and support.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                className="
                  inline-flex items-center gap-2 rounded-full
                  bg-blue-600 text-white px-5 py-3
                  text-[14px] sm:text-[15px] font-semibold
                  hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60
                  transition-colors duration-200
                "
              >
                Book A Strategy Session
                <TbArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Stats grid */}
          <ul
            className="
              mt-8 grid gap-8
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            {ITEMS.map(({ value, title, desc }) => (
              <li key={title} className="flex flex-col">
                <div>
                  <div className="text-slate-900 font-extrabold leading-none text-2xl sm:text-3xl">
                    {value}
                  </div>
                  <div className="text-slate-600/80 font-semibold mt-1 text-sm sm:text-base">
                    {title}
                  </div>
                </div>
                <p className="mt-3 text-slate-600 text-sm leading-6">{desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
