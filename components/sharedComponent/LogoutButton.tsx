"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      aria-label="Log out"
      className="flex items-center gap-2 rounded-control border border-border px-3 py-2 text-body font-medium hover:border-danger hover:bg-danger-soft hover:text-danger"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4" aria-hidden>
        <path d="M15 4h3a2 2 0 012 2v12a2 2 0 01-2 2h-3M10 17l-5-5 5-5M5 12h11" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="hidden tablet:inline">Log out</span>
    </button>
  );
}
