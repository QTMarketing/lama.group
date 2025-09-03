"use client";

type Props = {
  label?: string;
  onClick?: () => void;
};

export default function GoogleButton({ label = "Sign in with Google", onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2.5 px-4 hover:bg-gray-50 transition"
      aria-label={label}
    >
      {/* Official colored Google G (inline SVG) */}
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 31.9 29.3 35 24 35c-7 0-12.8-5.8-12.8-12.8S17 9.5 24 9.5c3.1 0 5.9 1.1 8 3.1l5.7-5.7C34.9 3.8 29.7 1.8 24 1.8 12 1.8 2.2 11.6 2.2 23.6S12 45.4 24 45.4c11.5 0 21-9.4 21-21 0-1.6-.2-3.1-.5-4.6z"/>
        <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16 19 13.2 24 13.2c3.1 0 5.9 1.1 8 3.1l5.7-5.7C34.9 6.8 29.7 4.8 24 4.8 16.2 4.8 9.5 9.1 6.3 14.7z"/>
        <path fill="#4CAF50" d="M24 42.4c5.2 0 9.9-2 13.5-5.3l-6.2-5.1c-2 1.4-4.6 2.2-7.3 2.2-5.2 0-9.6-3.3-11.2-7.9l-6.6 5.1c3.2 6.1 9.6 10.1 17.8 10.1z"/>
        <path fill="#1976D2" d="M45 24c0-1.6-.2-3.1-.5-4.6H24v8h11.3c-.6 3-2.4 5.5-4.9 7.2l6.2 5.1C40.9 36.4 45 30.8 45 24z"/>
      </svg>
      <span className="text-gray-800 font-medium">{label}</span>
    </button>
  );
}


