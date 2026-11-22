import Link from "next/link";
import Header from "@/components/Header";
import StatCard from "@/components/StatCard";
import TodoItem from "@/components/TodoItem";

// დროებითი სატესტო მონაცემები (მხოლოდ დიზაინისთვის)
const todos = [
  { id: 1, title: "Next.js-ის პროექტის დასრულება", date: "22 ნოემბერი", done: false },
  { id: 2, title: "ავთენთიფიკაციის დამატება", date: "23 ნოემბერი", done: false },
  { id: 3, title: "როლების (USER / ADMIN) შექმნა", date: "24 ნოემბერი", done: false },
  { id: 4, title: "Tailwind-ის დაყენება", date: "20 ნოემბერი", done: true },
  { id: 5, title: "git init და პირველი commit", date: "19 ნოემბერი", done: true },
];

const filters = ["ყველა", "აქტიური", "დასრულებული"];

export default function Home() {
  return (
    <>
      <Header />

      <main className="mx-auto w-full max-w-page flex-1 px-gutter py-6 tablet:px-gutter-tablet tablet:py-10">
        {/* Greeting */}
        <section className="mb-6 tablet:mb-8">
          <p className="text-body text-muted">გამარჯობა, გიორგი 👋</p>
          <h1 className="mt-1 text-heading font-bold tablet:text-display">ჩემი დავალებები</h1>
        </section>

        <div className="grid gap-6 desktop:grid-cols-[1fr_20rem] desktop:items-start">
          {/* Main column */}
          <div className="flex flex-col gap-6">
            {/* Stats */}
            <section className="grid grid-cols-3 gap-3 tablet:gap-4">
              <StatCard label="სულ" value={5} tone="primary" />
              <StatCard label="აქტიური" value={3} tone="warning" />
              <StatCard label="შესრულდა" value={2} tone="success" />
            </section>

            {/* Add todo */}
            <section className="rounded-card border border-border bg-surface p-4 shadow-card tablet:p-5">
              <form className="flex flex-col gap-3 tablet:flex-row">
                <input
                  type="text"
                  placeholder="ახალი დავალება..."
                  className="h-12 flex-1 rounded-control border border-border bg-bg px-4 text-body outline-none placeholder:text-muted focus:border-primary focus:ring-4 focus:ring-primary-soft"
                />
                <button
                  type="button"
                  className="h-12 rounded-control bg-primary px-6 text-body font-semibold text-on-primary hover:bg-primary-hover"
                >
                  + დამატება
                </button>
              </form>
            </section>

            {/* List */}
            <section className="rounded-card border border-border bg-surface p-4 shadow-card tablet:p-5">
              <div className="mb-4 flex flex-col gap-3 tablet:flex-row tablet:items-center tablet:justify-between">
                <h2 className="text-title font-semibold">დავალებების სია</h2>
                <div className="flex rounded-control bg-surface-muted p-1">
                  {filters.map((f, i) => (
                    <button
                      key={f}
                      type="button"
                      className={`flex-1 rounded-lg px-3 py-1.5 text-caption font-medium tablet:flex-none tablet:text-body ${
                        i === 0 ? "bg-surface text-text shadow-card" : "text-muted hover:text-text"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <ul className="flex flex-col gap-2">
                {todos.map((t) => (
                  <TodoItem key={t.id} title={t.title} date={t.date} done={t.done} />
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar (desktop) */}
          <aside className="hidden flex-col gap-6 desktop:flex">
            <section className="rounded-card border border-border bg-surface p-5 shadow-card">
              <h2 className="text-title font-semibold">პროგრესი</h2>
              <p className="mt-1 text-caption text-muted">შესრულებულია 5-დან 2</p>
              <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-surface-muted">
                <div className="h-full w-2/5 rounded-full bg-primary" />
              </div>
              <p className="mt-2 text-right text-heading font-bold text-primary">40%</p>
            </section>

            <section className="rounded-card border border-border bg-surface p-5 shadow-card">
              <h2 className="text-title font-semibold">შენი როლი</h2>
              <div className="mt-3 flex items-center gap-3">
                <span className="rounded-full bg-warning-soft px-3 py-1 text-caption font-semibold text-warning">ADMIN</span>
                <p className="text-caption text-muted">ხედავ ყველა მომხმარებლის დავალებას</p>
              </div>
              <Link
                href="/admin"
                className="mt-4 block rounded-control border border-border px-4 py-2.5 text-center text-body font-medium hover:bg-surface-muted"
              >
                ადმინ პანელზე გადასვლა →
              </Link>
            </section>
          </aside>
        </div>
      </main>
    </>
  );
}
