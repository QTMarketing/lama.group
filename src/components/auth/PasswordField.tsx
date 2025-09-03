"use client";

import { useState } from "react";

type Props = {
  id: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

export default function PasswordField({ id, name, value, onChange, placeholder }: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative mt-1">
      <input
        id={id}
        name={name}
        type={visible ? "text" : "password"}
        className="block w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required
      />
      {/* Eye toggle button (SVG) */}
      <button
        type="button"
        aria-label={visible ? "Hide password" : "Show password"}
        onClick={() => setVisible((v) => !v)}
        className="absolute inset-y-0 right-2 my-auto h-8 w-8 grid place-items-center text-gray-500 hover:text-gray-700"
      >
        {visible ? <EyeOffIcon /> : <EyeIcon />}
      </button>
    </div>
  );
}

function EyeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3.5" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 3l18 18" />
      <path d="M10.6 5.2A10.6 10.6 0 0 1 12 5c6.5 0 10 7 10 7a19.6 19.6 0 0 1-4.08 4.95M6.4 8.11C3.94 9.8 2 12 2 12s3.5 7 10 7a10.7 10.7 0 0 0 2.05-.2" />
      <circle cx="12" cy="12" r="3.5" />
    </svg>
  );
}


