import Link from "next/link";
import {
TbBuildingStore,
TbGasStation,
TbTruckDelivery,
TbTools,
TbLifebuoy,
} from "react-icons/tb";

type Item = {
label: string;
href: string;
external?: boolean;
Icon: React.ComponentType<{ className?: string }>;
};

const ITEMS: Item[] = [
{ label: "Store Leasing", href: "/store-leasing", Icon: TbBuildingStore },
{
label: "Fuel Branding & Supply",
href: "https://quicktrackfuel.com",
external: true,
Icon: TbGasStation,
},
{
label: "Wholesale Distribution",
href: "https://lamawholesale.com",
external: true,
Icon: TbTruckDelivery,
},
{
label: "Construction & Renovation",
href: "/construction-renovation",
Icon: TbTools,
},
{
label: "Maintenance & Support",
href: "/maintenance-support",
Icon: TbLifebuoy,
},
];

export default function ServiceBar() {
  return (
    <section aria-label="Services" className="w-full px-4 sm:px-6 lg:px-8 mt-8 mb-14">
      <div className="mx-auto max-w-[1680px]">
        <nav aria-label="Services">
          <ul className="grid [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))] bg-white border border-slate-300 rounded-none divide-y sm:divide-y-0 sm:divide-x divide-slate-300 shadow-sm">
            {ITEMS.map(({ label, href, external, Icon }) => (
              <li key={label} className="min-w-[200px]">
                <Link
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="
                    group flex items-center gap-4 px-6 py-6
                    text-slate-800 hover:bg-slate-50 hover:shadow-md
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40
                    transition-all duration-200
                  "
                  aria-label={label}
                  title={label}
                >
                  <Icon className="h-6 w-6 md:h-7 md:w-7 text-orange-600 flex-shrink-0" aria-hidden="true" />
                  <span className="font-semibold whitespace-nowrap text-[20px] leading-tight">
                    {label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
