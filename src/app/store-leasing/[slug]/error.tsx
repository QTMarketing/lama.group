'use client';

export default function Error({ error }: { error: Error }) {
  console.error(error);
  return (
    <main className="py-10">
      <div className="mx-auto max-w-3xl text-slate-700">
        Sorry, something went wrong loading this property.
      </div>
    </main>
  );
}


