import Link from "next/link";

export default function RoleCard() {
  return (
    <section className="rounded-card border border-border bg-surface p-5 shadow-card">
      <h2 className="text-title font-semibold">Your role</h2>
      <div className="mt-3 flex items-center gap-3">
        <span className="rounded-full bg-warning-soft px-3 py-1 text-caption font-semibold text-warning">ADMIN</span>
        <p className="text-caption text-muted">You can see every user&apos;s tasks</p>
      </div>
      <Link
        href="/admin"
        className="mt-4 block rounded-control border border-border px-4 py-2.5 text-center text-body font-medium hover:bg-surface-muted"
      >
        Go to admin panel →
      </Link>
    </section>
  );
}
