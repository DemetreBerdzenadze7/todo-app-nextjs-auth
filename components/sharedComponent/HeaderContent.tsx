import options from "@/app/api/auth/[...nextauth]/option";
import { getServerSession } from "next-auth";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default async function HeaderContent() {
  const session = await getServerSession(options);
  const isAdmin = session?.user.role === "ADMIN";
  const name = session?.user.name ?? "";
  const email = session?.user.email ?? "";

  return (
    <>
      {/* Nav (tablet+) */}
      <nav className="hidden items-center gap-1 tablet:flex">
        <Link href="/" className="rounded-control bg-primary-soft px-3 py-2 text-body font-medium text-primary">
          My tasks
        </Link>
        {isAdmin && (
          <Link
            href="/admin"
            className="rounded-control px-3 py-2 text-body font-medium text-muted hover:bg-surface-muted hover:text-text"
          >
            Admin panel
          </Link>
        )}
      </nav>

      {/* User */}
      <div className="flex items-center gap-3">
        <div className="hidden text-right desktop:block">
          <p className="text-body font-semibold leading-tight">{name}</p>
          <p className="text-caption text-muted">{email}</p>
        </div>
        <span className="grid size-9 place-items-center rounded-full bg-primary-soft text-body font-bold text-primary">
          {name.charAt(0).toUpperCase()}
        </span>
        {isAdmin && (
          <span className="rounded-full bg-warning-soft px-2.5 py-1 text-caption font-semibold text-warning">
            ADMIN
          </span>
        )}
        <LogoutButton />
      </div>
    </>
  );
}
