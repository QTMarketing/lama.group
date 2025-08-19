export function HeroSkeleton() {
  return (
    <div className="w-full h-64 md:h-96 bg-gray-200 rounded-2xl animate-pulse" />
  );
}

export function SectionSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-8 bg-gray-200 rounded-lg w-1/3 animate-pulse" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/2 mb-4" />
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  );
}

export function GallerySkeleton() {
  return (
    <div className="space-y-4">
      <div className="w-full h-64 md:h-96 bg-gray-200 rounded-2xl animate-pulse" />
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-gray-200 rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  );
} 