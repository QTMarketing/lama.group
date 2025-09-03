"use client";
import { ReactNode } from "react";
import Link from "next/link";

export default function ContactCard({
  icon,
  title,
  children,
  href,
  label,
  external = false,
  ariaLabel,
}: {
  icon: ReactNode;
  title: string;
  children?: ReactNode;
  href?: string;
  label?: string;
  external?: boolean;
  ariaLabel?: string;
}) {
  const IconWrap = ({ children }: { children: ReactNode }) => (
    <div className="inline-flex h-10 w-10 items-center justify-center rounded-[12px] bg-white ring-1 ring-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
      {children}
    </div>
  );

  const linkProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <div className="rounded-[18px] border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">
      <IconWrap>{icon}</IconWrap>
      <h3 className="mt-3 text-[18px] leading-[26px] font-semibold text-slate-900">{title}</h3>
      <div className="mt-1 text-[14px] leading-[22px] text-slate-600">{children}</div>
      {href && label && (
        <div className="mt-3">
          <Link
            href={href}
            className="text-[14px] font-medium underline text-slate-900"
            aria-label={ariaLabel || label}
            {...linkProps}
          >
            {label}
          </Link>
        </div>
      )}
    </div>
  );
}
