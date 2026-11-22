import Link from "next/link";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-surface/90 backdrop-blur">
      <div className="mx-auto flex h-header max-w-page items-center justify-between gap-4 px-gutter tablet:px-gutter-tablet">
        {/* Logo */}
        <Link href="/">
          <Logo />
        </Link>

        {/* Nav (tablet+) */}
        <nav className="hidden items-center gap-1 tablet:flex">
          <Link href="/" className="rounded-control bg-primary-soft px-3 py-2 text-body font-medium text-primary">
            My tasks
          </Link>
          <Link href="/admin" className="rounded-control px-3 py-2 text-body font-medium text-muted hover:bg-surface-muted hover:text-text">
            Admin panel
          </Link>
        </nav>

        {/* User */}
        <div className="flex items-center gap-3">
          <div className="hidden text-right desktop:block">
            <p className="text-body font-semibold leading-tight">Giorgi Beridze</p>
            <p className="text-caption text-muted">giorgi@mail.com</p>
          </div>
          <span className="grid size-9 place-items-center rounded-full bg-primary-soft text-body font-bold text-primary">
            GB
          </span>
          <span className="rounded-full bg-warning-soft px-2.5 py-1 text-caption font-semibold text-warning">
            ADMIN
          </span>
          <button
            type="button"
            className="hidden rounded-control border border-border px-3 py-2 text-body font-medium hover:bg-surface-muted tablet:block"
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}
