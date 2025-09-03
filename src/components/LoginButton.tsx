"use client";

interface LoginButtonProps {
  variant?: "small" | "large";
  children: React.ReactNode;
}

export default function LoginButton({ variant = "small", children }: LoginButtonProps) {
  const handleClick = () => {
    window.location.href = '/login';
  };

  const baseClasses = "bg-orange-500 hover:bg-orange-600 text-white font-semibold transition";
  const sizeClasses = variant === "small" 
    ? "px-3 py-1 rounded text-xs font-medium" 
    : "inline-flex items-center rounded-md px-4 py-2";

  return (
    <button 
      onClick={handleClick}
      className={`${baseClasses} ${sizeClasses}`}
    >
      {children}
    </button>
  );
}
