import RoleCard from "@/components/homeComponent/RoleCard";
import RoleBadge from "@/components/sharedComponent/RoleBadge";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("RoleBadge", () => {
  it.each<[Role, string]>([
    ["ADMIN", "text-warning"],
    ["USER", "text-primary"],
  ])("renders %s with its own color", (role, colorClass) => {
    render(<RoleBadge role={role} />);
    expect(screen.getByText(role)).toHaveClass(colorClass);
  });
});

describe("RoleCard", () => {
  it("tells a USER they only see their own tasks and hides the admin link", () => {
    render(<RoleCard role="USER" />);

    expect(screen.getByText("USER")).toBeInTheDocument();
    expect(screen.getByText(/only your own tasks/)).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("shows an ADMIN the link to the admin panel", () => {
    render(<RoleCard role="ADMIN" />);

    expect(screen.getByText(/every user's tasks/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /admin panel/i })).toHaveAttribute("href", "/admin");
  });
});
