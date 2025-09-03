"use client";

import React, { useMemo, useState } from "react";

export default function PartnershipDealerForm({ ctaClassName = "" }: { ctaClassName?: string }) {
  const [open, setOpen] = useState(false);
  const [additional, setAdditional] = useState("");

  const wordCount = useMemo(() => {
    return additional.trim().length === 0
      ? 0
      : additional.trim().split(/\s+/).length;
  }, [additional]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload: Record<string, any> = {};
    formData.forEach((value, key) => {
      payload[key] = value;
    });

    const res = await fetch('/api/partnership-dealer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const detail = await res.text();
      alert('Failed to submit. Please try again.\n' + detail);
      return;
    }

    alert('Submitted successfully. We\'ll follow up shortly.');
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(true)}
        className={`inline-flex items-center justify-center rounded-md font-medium text-white transition-colors bg-[#f97316] hover:bg-[#ea6a0d] w-[330px] h-[39.99px] ${ctaClassName}`}
      >
        Partnership Dealer Opportunities Form
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] bg-black/40"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      <div
        className={`fixed right-0 top-0 z-[61] h-full w-full max-w-[720px] transform bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Partnership Dealer Opportunities Form"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b px-5 py-4">
            <h2 className="text-xl font-semibold text-slate-900">Partnership Dealer Opportunities Form</h2>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close form"
              className="rounded-md p-2 text-slate-600 hover:bg-slate-100"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-5">
            <form onSubmit={handleSubmit} className="space-y-5">
              <Field label="Name">
                <input required type="text" name="name" className="input" />
              </Field>

              <Field label="Email">
                <input required type="email" name="email" className="input" />
              </Field>

              <Field label="Current Occupation">
                <input type="text" name="currentOccupation" className="input" />
              </Field>

              <Field label="Address">
                <textarea name="address" className="textarea" rows={3} />
              </Field>

              <Field label="Education">
                <input type="text" name="education" className="input" />
              </Field>

              <Field label="Do you own a convenience store/ gas station?">
                <Radio name="ownStore" />
              </Field>

              <Field label="If yes, for how long?">
                <input type="text" name="ownStoreHowLong" className="input" />
              </Field>

              <Field label="Address? (allow space for multiple addresses)">
                <textarea name="ownStoreAddresses" className="textarea" rows={3} />
              </Field>

              <Field label="Have you worked in a convenience store/ gas station?">
                <Radio name="workedStore" />
              </Field>

              <Field label="If yes, for how long?">
                <input type="text" name="workedStoreHowLong" className="input" />
              </Field>

              <Field label="Address? (allow space for multiple addresses)">
                <textarea name="workedStoreAddresses" className="textarea" rows={3} />
              </Field>

              <Field label="Current Business Address">
                <textarea name="currentBusinessAddress" className="textarea" rows={3} />
              </Field>

              <Field label="Years of Operation (Current Business)">
                <input type="text" name="yearsOfOperation" className="input" />
              </Field>

              <Field label="Trade References (minimum 3 required, must include company name, contact person, number or email address)">
                <textarea name="tradeReferences" className="textarea" rows={4} required />
              </Field>

              <Field label="Annual Income">
                <input type="text" name="annualIncome" className="input" />
              </Field>

              <Field label="Liquid Cash-on-Hand">
                <input type="text" name="liquidCash" className="input" />
              </Field>

              <Field label="What is the initial investment amount you are willing to make?">
                <input type="text" name="initialInvestment" className="input" />
              </Field>

              <Field label="Are you willing to relocate?">
                <Radio name="relocate" />
              </Field>

              <Field label="Personal References (minimum 2 required, must include name, relationship, contact information)">
                <textarea name="personalReferences" className="textarea" rows={3} required />
              </Field>

              <Field label="Additional Questions/Remarks (200 words max)">
                <textarea
                  className="textarea"
                  rows={4}
                  value={additional}
                  onChange={(e) => setAdditional(e.target.value)}
                  name="additionalRemarks"
                />
                <div className={`mt-1 text-xs ${wordCount > 200 ? "text-red-600" : "text-slate-500"}`}>
                  {wordCount}/200 words
                </div>
              </Field>

              <div className="pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full px-5 py-2.5 font-bold text-white transition-colors bg-[#FFA559] hover:bg-[#FF8C42]"
                  disabled={wordCount > 200}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
          padding: 10px 12px;
          outline: none;
          transition: box-shadow 0.2s ease;
        }
        .input:focus {
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
        }
        .textarea {
          width: 100%;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
          padding: 10px 12px;
          outline: none;
          transition: box-shadow 0.2s ease;
          resize: vertical;
        }
        .textarea:focus {
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
        }
        label.label {
          display: block;
          margin-bottom: 6px;
          font-weight: 600;
          color: #111827;
        }
      `}</style>
    </div>
  );
}

function Field({ label, children, id: idProp }: { label: string; children: React.ReactNode; id?: string }) {
  const baseId = (idProp || label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')).slice(0, 64);

  let content: React.ReactNode = children;
  if (children && (children as any).type && typeof (children as any).type === 'string') {
    const elType = (children as any).type as string;
    if (['input', 'textarea', 'select'].includes(elType)) {
      const props = (children as any).props || {};
      if (!props.id) {
        content = React.cloneElement(children as any, { id: baseId });
      }
    }
  }

  return (
    <div>
      <label className="label" htmlFor={baseId}>{label}</label>
      {content}
    </div>
  );
}

function Radio({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-6">
      <label className="inline-flex items-center gap-2 text-slate-700">
        <input type="radio" name={name} value="yes" className="h-4 w-4" />
        <span>YES</span>
      </label>
      <label className="inline-flex items-center gap-2 text-slate-700">
        <input type="radio" name={name} value="no" className="h-4 w-4" />
        <span>NO</span>
      </label>
    </div>
  );
}


