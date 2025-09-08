import React from "react";

const services = [
  { label: "Store Leasing", href: "/store-leasing" },
  { label: "Fuel Branding & Supply", href: "/fuel-branding" },
  { label: "Wholesale Distribution", href: "/wholesale" },
  { label: "Construction & Renovation", href: "/construction" },
  { label: "Maintenance & Support", href: "/maintenance" },
];

export default function ServicesBar() {
  return (
    <div className="relative z-30">
      <div
        className="pointer-events-none flex justify-center"
        style={{ transform: "translateY(-32px)" }}
      >
        <div className="pointer-events-auto w-full max-w-[1200px] px-4">
          <div className="bg-white rounded-2xl shadow-lg p-4">
            {/* Desktop / Tablet */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-5 gap-4">
              {services.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className="flex items-center justify-between rounded-full bg-[#F97316] text-white font-semibold px-6 py-3 shadow-sm hover:shadow-md hover:bg-orange-600 active:translate-y-px transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black/20 focus-visible:ring-offset-white"
                >
                  <span>{item.label}</span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12h14M13 5l7 7-7 7"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              ))}
            </div>

            {/* Mobile Scroll */}
            <div className="md:hidden overflow-x-auto no-scrollbar">
              <div className="flex gap-3">
                {services.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    className="flex items-center justify-between rounded-full bg-[#F97316] text-white font-semibold px-6 py-3 shadow-sm hover:shadow-md hover:bg-orange-600 active:translate-y-px transition whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black/20 focus-visible:ring-offset-white"
                  >
                    <span>{item.label}</span>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 12h14M13 5l7 7-7 7"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


