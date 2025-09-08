"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./PartnershipDealerFormModal.module.css";
import Portal from "./Portal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  sourceUrl?: string;
  formSelector?: string;
  title?: string;
  reactContent?: React.ReactNode; // optional direct React content instead of fetch
};

const DEFAULT_SOURCE = "/for-lease";
const DEFAULT_SELECTOR = "#partnership-dealer-opportunities-form";
const DEFAULT_TITLE = "Partnership Dealer Opportunities Form";

export default function PartnershipDealerFormModal({
  isOpen,
  onClose,
  sourceUrl = DEFAULT_SOURCE,
  formSelector = DEFAULT_SELECTOR,
  title = DEFAULT_TITLE,
  reactContent,
}: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const [loading, setLoading] = useState(false);
  const [html, setHtml] = useState<string | null>(null);
  const [useIframe, setUseIframe] = useState(false);

  const anchor = useMemo(() => {
    if (!formSelector) return "";
    if (formSelector.startsWith("#")) return formSelector.slice(1);
    return "";
  }, [formSelector]);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    openerRef.current = (document.activeElement as HTMLElement) ?? null;
    const first = modalRef.current?.querySelector<HTMLElement>("[data-modal-title]") ?? modalRef.current;
    first?.focus();
  }, [isOpen, html, useIframe]);

  const restoreFocus = useCallback(() => {
    const opener = openerRef.current;
    if (opener && typeof opener.focus === "function") opener.focus();
  }, []);

  const close = useCallback(() => {
    onClose();
    setTimeout(() => restoreFocus(), 0);
  }, [onClose, restoreFocus]);

  const onOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) close();
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); close(); return; }
      if (e.key === "Tab") {
        const focusables = getFocusable(modalRef.current);
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey) {
          if (!active || active === first) { e.preventDefault(); last.focus(); }
        } else {
          if (!active || active === last) { e.preventDefault(); first.focus(); }
        }
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, close]);

  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;
    if (reactContent) {
      // If React content is provided, use it directly (no fetch)
      setHtml(null);
      setUseIframe(false);
      setLoading(false);
      return;
    }
    const load = async () => {
      setLoading(true); setUseIframe(false); setHtml(null);
      try {
        const res = await fetch(sourceUrl, { credentials: "same-origin", cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to fetch source: ${res.status}`);
        const text = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");
        const formEl = doc.querySelector<HTMLFormElement>(formSelector);
        if (!formEl) throw new Error(`Form not found with selector ${formSelector}`);
        formEl.querySelectorAll("script, style").forEach((el) => el.remove());
        formEl.querySelectorAll<HTMLElement>("[onload],[onclick],[onerror],[onfocus],[onblur],[onsubmit],[onchange]").forEach((el) => {
          [...el.getAttributeNames()].forEach((name) => { if (name.startsWith("on")) el.removeAttribute(name); });
        });
        const formAction = formEl.getAttribute("action") || sourceUrl;
        const absolute = new URL(formAction, window.location.origin);
        formEl.setAttribute("action", absolute.toString());
        if (!formEl.getAttribute("method")) formEl.setAttribute("method", "post");
        addRequiredStars(formEl);
        if (!cancelled) setHtml(formEl.outerHTML);
      } catch (err) {
        console.warn("Falling back to iframe due to error:", err);
        if (!cancelled) setUseIframe(true);
      } finally { if (!cancelled) setLoading(false); }
    };
    load();
    return () => { cancelled = true; };
  }, [isOpen, sourceUrl, formSelector]);

  if (!isOpen) return null;
  return (
    <Portal>
      <div ref={overlayRef} className={`${styles.overlay} ${styles.open}`} onMouseDown={onOverlayClick}>
        <div ref={modalRef} className={`${styles.modal} ${styles.modalOpen}`} role="dialog" aria-modal="true" aria-labelledby="pdo-modal-title" tabIndex={-1} onMouseDown={(e) => e.stopPropagation()}>
          <div className={styles.header}>
            <h2 id="pdo-modal-title" data-modal-title className={styles.title} tabIndex={-1}>{title}</h2>
            <button type="button" aria-label="Close" className={styles.closeBtn} onClick={close}>✕</button>
          </div>
          <div className={styles.content} ref={contentRef}>
            {loading && <p>Loading form…</p>}
            {!loading && reactContent}
            {!loading && html && <div dangerouslySetInnerHTML={{ __html: html }} />}
            {!loading && !html && useIframe && (
              <iframe className={styles.iframeWrap} title="Partnership Dealer Opportunities Form" src={`${sourceUrl}${anchor ? `#${anchor}` : ""}`} />
            )}
            {!loading && !html && !useIframe && (
              <p>Unable to load the form at this time. Please use the link on the page.</p>
            )}
          </div>
        </div>
      </div>
    </Portal>
  );
}

function getFocusable(root: HTMLElement | null): HTMLElement[] {
  if (!root) return [];
  const selectors = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "[tabindex]:not([tabindex='-1'])",
  ].join(",");
  const nodes = Array.from(root.querySelectorAll<HTMLElement>(selectors));
  return nodes.filter((el) => !el.hasAttribute("inert") && el.offsetParent !== null);
}

function addRequiredStars(formEl: HTMLFormElement) {
  const requiredFields = formEl.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
    "input[required], textarea[required], select[required], input[aria-required='true'], textarea[aria-required='true'], select[aria-required='true']"
  );
  requiredFields.forEach((field) => {
    const id = field.getAttribute("id");
    let label: HTMLLabelElement | null = null;
    if (id) label = formEl.querySelector(`label[for='${CSS.escape(id)}']`);
    if (!label) label = field.closest("label");
    if (!label) {
      const maybe = field.parentElement?.querySelector("label");
      if (maybe) label = maybe as HTMLLabelElement;
    }
    if (!field.hasAttribute("aria-required")) field.setAttribute("aria-required", "true");
    if (label && !label.querySelector(".reqStar")) {
      const star = formEl.ownerDocument!.createElement("span");
      star.className = "reqStar";
      star.setAttribute("aria-hidden", "true");
      star.textContent = "*";
      label.appendChild(star);
    }
  });
}


