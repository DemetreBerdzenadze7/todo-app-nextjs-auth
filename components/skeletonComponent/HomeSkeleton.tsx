import Skeleton from "./Skeleton";
import TodoListSkeleton from "./TodoListSkeleton";

const card = "rounded-card border border-border bg-surface shadow-card";

export default function HomeSkeleton() {
  return (
    <main className="mx-auto w-full max-w-page flex-1 px-gutter py-6 tablet:px-gutter-tablet tablet:py-10">
      {/* Greeting */}
      <section className="mb-6 flex flex-col gap-2 tablet:mb-8">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-8 w-48 tablet:h-10 tablet:w-64" />
      </section>

      <div className="grid gap-6 desktop:grid-cols-[1fr_20rem] desktop:items-start">
        <div className="flex flex-col gap-6">
          {/* Stats */}
          <section className="grid grid-cols-3 gap-3 tablet:gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className={`${card} flex flex-col gap-3 p-3 tablet:p-5`}>
                <Skeleton className="h-5 w-14 rounded-full" />
                <Skeleton className="h-7 w-10 tablet:h-9" />
              </div>
            ))}
          </section>

          {/* Add todo */}
          <section className={`${card} flex flex-col gap-3 p-4 tablet:flex-row tablet:p-5`}>
            <Skeleton className="h-12 flex-1 rounded-control" />
            <Skeleton className="h-12 rounded-control tablet:w-32" />
          </section>

          <TodoListSkeleton />
        </div>

        {/* Sidebar (desktop) */}
        <aside className="hidden flex-col gap-6 desktop:flex">
          <section className={`${card} flex flex-col gap-3 p-5`}>
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-3 w-32" />
            <Skeleton className="mt-2 h-2.5 w-full rounded-full" />
            <Skeleton className="ml-auto h-7 w-14" />
          </section>
          <section className={`${card} flex flex-col gap-3 p-5`}>
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="mt-2 h-10 w-full rounded-control" />
          </section>
        </aside>
      </div>
    </main>
  );
}
