import HeaderContent from "@/components/sharedComponent/HeaderContent";
import { render, screen } from "@testing-library/react";
import { getServerSession } from "next-auth";
import { describe, expect, it, vi } from "vitest";

vi.mock("next-auth", () => ({ getServerSession: vi.fn() }));
vi.mock("next-auth/react", () => ({ signOut: vi.fn() }));
vi.mock("@/app/api/auth/[...nextauth]/option", () => ({ default: {} }));

const renderAs = async (role: Role, name: string, email: string) => {
  vi.mocked(getServerSession).mockResolvedValue({ user: { id: "1", name, email, role }, expires: "" });
  render(await HeaderContent());
};

describe("HeaderContent (async Server Component)", () => {
  it("shows the ADMIN badge and admin link only for admins", async () => {
    await renderAs("ADMIN", "Admin", "admin@todo.ge");

    expect(screen.getByText("ADMIN")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Admin panel" })).toHaveAttribute("href", "/admin");
  });

  it("hides admin-only UI for a regular user", async () => {
    await renderAs("USER", "Giorgi", "user@todo.ge");

    expect(screen.queryByText("ADMIN")).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Admin panel" })).not.toBeInTheDocument();
  });

  it("shows the real name, email and initial from the session", async () => {
    await renderAs("USER", "giorgi", "user@todo.ge");

    expect(screen.getByText("giorgi")).toBeInTheDocument();
    expect(screen.getByText("user@todo.ge")).toBeInTheDocument();
    expect(screen.getByText("G")).toBeInTheDocument();
  });

  it("always offers a way to log out", async () => {
    await renderAs("USER", "Giorgi", "user@todo.ge");
    expect(screen.getByRole("button", { name: "Log out" })).toBeInTheDocument();
  });
});
