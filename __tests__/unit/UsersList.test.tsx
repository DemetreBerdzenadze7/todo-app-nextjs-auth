import UsersList from "@/components/adminComponent/UsersList";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

const users = [
  { id: "1", name: "Admin", email: "admin@todo.ge", role: "ADMIN" as const },
  { id: "2", name: "Giorgi", email: "user@todo.ge", role: "USER" as const },
];

const todos: Todos[] = [
  { id: "a", title: "A", done: false, userId: "2", createdAt: "2026-11-22T10:00:00.000Z" },
  { id: "b", title: "B", done: true, userId: "2", createdAt: "2026-11-22T10:00:00.000Z" },
  { id: "c", title: "C", done: false, userId: "1", createdAt: "2026-11-22T10:00:00.000Z" },
];

const cardOf = (name: string) => screen.getByText(name).closest("li")!;

describe("UsersList", () => {
  it("shows every user with their email, role and total count", () => {
    render(<UsersList users={users} todos={todos} />);

    expect(screen.getByText("2 total")).toBeInTheDocument();
    expect(within(cardOf("Giorgi")).getByText("user@todo.ge")).toBeInTheDocument();
    expect(within(cardOf("Giorgi")).getByText("USER")).toBeInTheDocument();
    expect(within(cardOf("Admin")).getByText("ADMIN")).toBeInTheDocument();
  });

  it("counts tasks per user", () => {
    render(<UsersList users={users} todos={todos} />);

    expect(within(cardOf("Giorgi")).getByText("2")).toBeInTheDocument();
    expect(within(cardOf("Admin")).getByText("1")).toBeInTheDocument();
  });
});
