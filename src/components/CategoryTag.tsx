export default function CategoryTag({ name }: { name?: string }) {
  if (!name) return null;
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">
      {name}
    </span>
  );
}


