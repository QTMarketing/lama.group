"use client";

type Props = {
  score: 0 | 1 | 2 | 3 | 4;
  label: "Weak" | "Medium" | "Strong" | "Very Strong" | "Empty";
};

export default function PasswordStrengthBar({ score, label }: Props) {
  // Map score to color classes
  const color =
    score <= 1
      ? "bg-red-500"
      : score === 2
      ? "bg-yellow-500"
      : score === 3
      ? "bg-green-500"
      : "bg-blue-600";

  const percent = `${(score / 4) * 100}%`;

  return (
    <div>
      <div className="h-2 w-full bg-gray-200 rounded">
        <div className={`h-2 ${color} rounded transition-all`} style={{ width: percent }} />
      </div>
      <p className="text-xs text-gray-600 mt-1">Strength: <span className="font-medium">{label === "Empty" ? "—" : label}</span></p>
    </div>
  );
}


