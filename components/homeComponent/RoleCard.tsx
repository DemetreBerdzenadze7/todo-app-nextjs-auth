import Link from "next/link";
import RoleBadge from "../sharedComponent/RoleBadge";

type RoleCardProps = {
  role: Role;
};

export default function RoleCard({ role }: RoleCardProps) {
  const isAdmin = role === "ADMIN";

  return (
    <section className="rounded-card border border-border bg-surface p-5 shadow-card">
      <h2 className="text-title font-semibold">Your role</h2>
      <div className="mt-3 flex items-center gap-3">
        <RoleBadge role={role} />
        <p className="text-caption text-muted">
          {isAdmin ? "You can see every user's tasks" : "You can see and manage only your own tasks"}
        </p>
      </div>

      {isAdmin && (
        <Link
          href="/admin"
          className="mt-4 block rounded-control border border-border px-4 py-2.5 text-center text-body font-medium hover:bg-surface-muted"
        >
          Go to admin panel →
        </Link>
      )}
    </section>
  );
}
