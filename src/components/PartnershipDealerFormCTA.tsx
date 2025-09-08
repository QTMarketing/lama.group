"use client";

import { useState } from "react";
import PartnershipDealerFormModal from "./PartnershipDealerFormModal";
import PartnershipDealerForm from "./PartnershipDealerForm";

type Props = {
  className?: string;
  label?: string;
  sourceUrl?: string;
  formSelector?: string;
  title?: string;
};

const DEFAULT_SOURCE = "/for-lease";
const DEFAULT_SELECTOR = "#partnership-dealer-opportunities-form";
const DEFAULT_TITLE = "Partnership Dealer Opportunities Form";

export default function PartnershipDealerFormCTA({
  className = "cta cta--secondary",
  label = "Partnership Dealer Opportunities Form",
  sourceUrl = DEFAULT_SOURCE,
  formSelector = DEFAULT_SELECTOR,
  title = DEFAULT_TITLE,
}: Props) {
  const [open, setOpen] = useState(false);

  const anchor = formSelector.startsWith("#") ? formSelector.slice(1) : "";
  const hrefFallback = `${sourceUrl}${anchor ? `#${anchor}` : ""}`;

  return (
    <>
      <a
        className={className}
        href={hrefFallback}
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
        aria-haspopup="dialog"
        aria-controls="pdo-modal"
      >
        {label}
      </a>

      <PartnershipDealerFormModal
        isOpen={open}
        onClose={() => setOpen(false)}
        sourceUrl={sourceUrl}
        formSelector={formSelector}
        title={title}
        // Render the exact same React form used in for-lease category, inline (no inner CTA)
        reactContent={<PartnershipDealerForm inline />}
      />
    </>
  );
}


