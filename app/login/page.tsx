import Link from "next/link";

const demoAccounts = [
  { role: "ADMIN", username: "Admin", password: "1234", tone: "bg-warning-soft text-warning" },
  { role: "USER", username: "Giorgi", password: "123", tone: "bg-primary-soft text-primary" },
];

export default function LoginPage() {
  return (
    <main className="grid flex-1 desktop:grid-cols-2">
      {/* Brand panel (desktop) */}
      <section className="hidden flex-col justify-between bg-primary p-12 text-on-primary desktop:flex">
        <div className="flex items-center gap-2">
          <span className="grid size-10 place-items-center rounded-control bg-on-primary/15">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="size-5" aria-hidden>
              <path d="M5 12.5l4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="text-title font-bold">Todo App</span>
        </div>

        <div>
          <h2 className="text-display font-bold leading-tight">
            დაგეგმე დღე,
            <br />
            მართე დავალებები.
          </h2>
          <p className="mt-4 max-w-sm text-body opacity-80">
            პირადი დავალებების სია როლებით: მომხმარებელი ხედავს თავისას, ადმინი კი ყველას.
          </p>
        </div>

        <p className="text-caption opacity-60">© 2026 Todo App</p>
      </section>

      {/* Form */}
      <section className="flex items-center justify-center px-gutter py-10 tablet:px-gutter-tablet">
        <div className="w-full max-w-md">
          {/* Logo (mobile / tablet) */}
          <div className="mb-8 flex items-center justify-center gap-2 desktop:hidden">
            <span className="grid size-10 place-items-center rounded-control bg-primary text-on-primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="size-5" aria-hidden>
                <path d="M5 12.5l4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-title font-bold">Todo App</span>
          </div>

          <div className="rounded-card border border-border bg-surface p-6 shadow-card tablet:p-8 desktop:border-0 desktop:bg-transparent desktop:p-0 desktop:shadow-none">
            <h1 className="text-heading font-bold tablet:text-display">შესვლა</h1>
            <p className="mt-1 text-body text-muted">შეიყვანე შენი მონაცემები</p>

            <form className="mt-6 flex flex-col gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-body font-medium">მომხმარებლის სახელი</span>
                <input
                  type="text"
                  name="username"
                  placeholder="მაგ. Giorgi"
                  autoComplete="username"
                  className="h-12 rounded-control border border-border bg-bg px-4 text-body outline-none placeholder:text-muted focus:border-primary focus:ring-4 focus:ring-primary-soft"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-body font-medium">პაროლი</span>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••"
                  autoComplete="current-password"
                  className="h-12 rounded-control border border-border bg-bg px-4 text-body outline-none placeholder:text-muted focus:border-primary focus:ring-4 focus:ring-primary-soft"
                />
              </label>

              {/* Error message (ჯერ დამალულია, ლოგიკის დამატებისას გამოჩნდება) */}
              <p className="hidden rounded-control bg-danger-soft px-4 py-3 text-caption font-medium text-danger">
                სახელი ან პაროლი არასწორია
              </p>

              <button
                type="submit"
                className="mt-2 h-12 rounded-control bg-primary text-body font-semibold text-on-primary hover:bg-primary-hover"
              >
                შესვლა
              </button>
            </form>

            <p className="mt-6 text-center text-body text-muted">
              არ გაქვს ანგარიში?{" "}
              <Link href="/register" className="font-semibold text-primary hover:underline">
                რეგისტრაცია
              </Link>
            </p>
          </div>

          {/* Demo accounts */}
          <div className="mt-6 rounded-card border border-dashed border-border p-4">
            <p className="text-caption font-semibold uppercase tracking-wide text-muted">სატესტო ანგარიშები</p>
            <ul className="mt-3 flex flex-col gap-2">
              {demoAccounts.map((acc) => (
                <li key={acc.role} className="flex items-center justify-between gap-3 text-body">
                  <span className={`rounded-full px-2.5 py-0.5 text-caption font-semibold ${acc.tone}`}>{acc.role}</span>
                  <span className="font-mono text-caption text-muted">
                    {acc.username} / {acc.password}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
