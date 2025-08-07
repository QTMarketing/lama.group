import React from "react";

const navItems = [
  {
    label: "Visit QuickTrackinc",
    href: "https://www.quicktrackinc.com",
    external: true,
  },
  {
    label: "Visit Franchising",
    href: "#",
    external: false,
  },
  {
    label: "Contact Us",
    href: "#",
    external: false,
  },
  {
    label: "LaMa Wholesale",
    href: "https://www.lamawholesale.com",
    external: true,
  },
  {
    label: "Visit QuickTrack Fuel",
    href: "https://www.quicktrackfuel.com",
    external: true,
  },
];

export default function BottomNavBar() {
  return (
    <section className="w-full bg-[#FF6600] shadow-md mt-8 md:mt-12">
      <div className="max-w-screen-xl mx-auto flex flex-wrap justify-center items-center gap-x-6 gap-y-2 py-4 px-6 text-center">
        {navItems.map((item, idx) => (
          <React.Fragment key={item.label}>
            {item.external ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-medium text-base hover:text-gray-100 transition-colors whitespace-nowrap"
              >
                {item.label} <span className="inline-block ml-1">&#8594;</span>
              </a>
            ) : (
              <span className="text-white font-medium text-base whitespace-nowrap">
                {item.label} <span className="inline-block ml-1">&#8594;</span>
              </span>
            )}
            {idx < navItems.length - 1 && (
              <span className="text-white px-2 select-none">|</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
