import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-surface/90 backdrop-blur">
      <div className="mx-auto flex h-header max-w-page items-center justify-between gap-4 px-gutter tablet:px-gutter-tablet">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-control bg-primary text-on-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="size-5" aria-hidden>
              <path d="M5 12.5l4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="text-title font-bold">Todo App</span>
        </Link>

        {/* Nav (tablet+) */}
        <nav className="hidden items-center gap-1 tablet:flex">
          <Link href="/" className="rounded-control bg-primary-soft px-3 py-2 text-body font-medium text-primary">
            ჩემი დავალებები
          </Link>
          <Link href="/admin" className="rounded-control px-3 py-2 text-body font-medium text-muted hover:bg-surface-muted hover:text-text">
            ადმინ პანელი
          </Link>
        </nav>

        {/* User */}
        <div className="flex items-center gap-3">
          <div className="hidden text-right desktop:block">
            <p className="text-body font-semibold leading-tight">გიორგი ბერიძე</p>
            <p className="text-caption text-muted">giorgi@mail.com</p>
          </div>
          <span className="grid size-9 place-items-center rounded-full bg-primary-soft text-body font-bold text-primary">
            გბ
          </span>
          <span className="rounded-full bg-warning-soft px-2.5 py-1 text-caption font-semibold text-warning">
            ADMIN
          </span>
          <button
            type="button"
            className="hidden rounded-control border border-border px-3 py-2 text-body font-medium hover:bg-surface-muted tablet:block"
          >
            გასვლა
          </button>
        </div>
      </div>
    </header>
  );
}
