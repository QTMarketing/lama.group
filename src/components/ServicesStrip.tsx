import React from "react";

const items = [
  { label: "Store Leasing", href: "/store-leasing" },
  { label: "Fuel Branding & Supply", href: "/fuel-branding" },
  { label: "Wholesale Distribution", href: "/wholesale" },
  { label: "Construction & Renovation", href: "/construction" },
  { label: "Maintenance & Support", href: "/maintenance" },
];

export default function ServicesStrip() {
  return (
    <div
      aria-label="Primary services"
      className="relative z-30 w-full"
    >
      <div
        className="pointer-events-none flex justify-center"
        style={{ transform: "translateY(-32px)" }}
      >
        <div className="pointer-events-auto w-full max-w-[1200px] px-4">
          <nav
            className="bg-white rounded-2xl shadow-lg shadow-black/5 border border-black/5 p-3 md:p-4"
            aria-label="Services navigation"
          >
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4">
              {items.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className="group inline-flex items-center justify-between rounded-xl bg-[#F97316] text-white font-semibold h-12 lg:h-14 px-4 lg:px-5 transition shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black/20 focus-visible:ring-offset-white active:translate-y-px"
                >
                  <span className="truncate">{item.label}</span>
                  <span className="ml-3 flex-none transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-95">
                      <path d="M5 12h14M13 5l7 7-7 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </a>
              ))}
            </div>

            <div className="md:hidden -mx-4 px-4 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory" aria-label="Services navigation mobile">
              <div className="flex gap-3 py-1">
                {items.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    className="snap-start group inline-flex items-center justify-between rounded-xl bg-[#F97316] text-white font-semibold h-12 px-4 transition shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black/20 focus-visible:ring-offset-white active:translate-y-px whitespace-nowrap"
                  >
                    <span className="truncate">{item.label}</span>
                    <span className="ml-3 flex-none transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-95">
                        <path d="M5 12h14M13 5l7 7-7 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}


