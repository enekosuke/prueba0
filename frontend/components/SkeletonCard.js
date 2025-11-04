export default function SkeletonCard() {
  return (
    <div className="card-glass h-full overflow-hidden">
      <div className="skeleton h-64 w-full" />
      <div className="space-y-4 p-6">
        <div className="skeleton h-4 w-24" />
        <div className="skeleton h-6 w-3/4" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-2/3" />
        <div className="skeleton h-10 w-32" />
      </div>
    </div>
  );
}
