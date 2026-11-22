import Skeleton from "./Skeleton";

type TodoListSkeletonProps = {
  rows?: number;
};

export default function TodoListSkeleton({ rows = 4 }: TodoListSkeletonProps) {
  return (
    <section className="rounded-card border border-border bg-surface p-4 shadow-card tablet:p-5">
      <div className="mb-4 flex flex-col gap-3 tablet:flex-row tablet:items-center tablet:justify-between">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-9 w-full rounded-control tablet:w-64" />
      </div>

      <ul className="flex flex-col gap-2">
        {Array.from({ length: rows }).map((_, i) => (
          <li key={i} className="flex items-center gap-3 rounded-control border border-border px-4 py-3">
            <Skeleton className="size-6 shrink-0 rounded-full" />
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-16" />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
