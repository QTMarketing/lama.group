import ContactCard from "@/components/ContactCard";
import { TbMail, TbMapPin, TbPhone, TbClockHour4 } from "react-icons/tb";

function GridBG() {
  // faint grid background
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        background:
          "radial-gradient(circle at 1px 1px, rgba(2,6,23,0.06) 1px, transparent 0) 0 0 / 24px 24px",
      }}
    />
  );
}

// Optional helper to build site URL for JSON-LD
function siteUrl() {
  if (typeof process !== "undefined" && process.env.NEXTAUTH_URL) return process.env.NEXTAUTH_URL;
  if (typeof window !== "undefined") return window.location.origin;
  return "https://lamagroup.com";
}

export const metadata = {
  title: "Contact | LaMa Group",
  description: "Get in touch with LaMa Group. Call, email, or find us on Google Maps.",
};

export default function ContactPage() {
  const mapsHref =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("1501 Pipeline Rd E Ste B, Bedford, TX 76022");

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LaMa Group",
    url: siteUrl(),
    email: "lama@lamagroup.com",
    telephone: "+1-817-545-9191",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1501 Pipeline Rd E Ste B",
      addressLocality: "Bedford",
      addressRegion: "TX",
      postalCode: "76022",
      addressCountry: "US",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+1-817-545-9191",
        contactType: "customer service",
        availableLanguage: ["English"],
        areaServed: "US",
      },
    ],
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "09:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "10:00", closes: "16:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Sunday"], opens: "00:00", closes: "00:00", validFrom: "Closed" },
    ],
  };

  return (
    <main className="relative">
      <GridBG />
      <section className="mx-auto max-w-[1216px] px-4 py-16 md:py-20">
        <div className="text-center">
          <h1 className="text-[32px] leading-[38px] md:text-[44px] md:leading-[52px] font-extrabold tracking-tight text-slate-900">
            Talk to our experts
          </h1>
          <p className="mt-2 text-[16px] leading-[24px] text-slate-600">
            Have questions about our services or support? We'd love to help.
          </p>
        </div>

        <script
          type="application/ld+json"
          // suppressHydrationWarning avoids hydration diff due to env on server
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[10px]">
          {/* Email */}
          <ContactCard
            icon={<TbMail size={20} aria-hidden="true" className="text-slate-700" />}
            title="Email"
            href="mailto:lama@lamagroup.com"
            label="lama@lamagroup.com"
            ariaLabel="Email lama@lamagroup.com"
          >
            Send us an email—we'll get back quickly.
          </ContactCard>

          {/* Business Hours */}
          <ContactCard
            icon={<TbClockHour4 size={20} aria-hidden="true" className="text-slate-700" />}
            title="Business Hours"
          >
            <ul className="space-y-1">
              <li>Monday - Friday: 9:00 AM - 6:00 PM</li>
              <li>Saturday: 10:00 AM - 4:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </ContactCard>

          {/* Visit Us */}
          <ContactCard
            icon={<TbMapPin size={20} aria-hidden="true" className="text-slate-700" />}
            title="Address"
            href={mapsHref}
            label="Click to View on Google Maps"
            external
            ariaLabel="Open Google Maps for 1501 Pipeline Rd E Ste B, Bedford, TX 76022"
          >
            1501 Pipeline Rd E Ste B,<br /> Bedford, TX 76022
          </ContactCard>

          {/* Phone */}
          <ContactCard
            icon={<TbPhone size={20} aria-hidden="true" className="text-slate-700" />}
            title="Phone"
            href="tel:+18175459191"
            label="+1 (817) 545-9191"
            ariaLabel="Call +1 817 545 9191"
          >
            Call our team.
          </ContactCard>
        </div>
      </section>
    </main>
  );
}