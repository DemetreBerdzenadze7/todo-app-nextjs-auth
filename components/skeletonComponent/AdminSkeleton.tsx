import Skeleton from "./Skeleton";
import TodoListSkeleton from "./TodoListSkeleton";

const card = "rounded-card border border-border bg-surface shadow-card";

export default function AdminSkeleton() {
  return (
    <main className="mx-auto w-full max-w-page flex-1 px-gutter py-6 tablet:px-gutter-tablet tablet:py-10">
      <section className="mb-6 flex flex-col gap-3 tablet:mb-8">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-8 w-48 tablet:h-10 tablet:w-64" />
        <Skeleton className="h-4 w-56" />
      </section>

      <section className="mb-6 grid grid-cols-2 gap-3 tablet:grid-cols-4 tablet:gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={`${card} flex flex-col gap-3 p-3 tablet:p-5`}>
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-7 w-10 tablet:h-9" />
          </div>
        ))}
      </section>

      <div className="grid gap-6 desktop:grid-cols-[1fr_24rem] desktop:items-start">
        <TodoListSkeleton rows={5} />

        <section className={`${card} p-4 tablet:p-5`}>
          <Skeleton className="mb-4 h-6 w-20" />
          <ul className="flex flex-col gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <li key={i} className="flex items-center gap-3 rounded-control border border-border px-4 py-3">
                <Skeleton className="size-10 shrink-0 rounded-full" />
                <div className="flex flex-1 flex-col gap-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-8 w-8" />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
