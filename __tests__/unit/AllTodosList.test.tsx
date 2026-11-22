import AllTodosList from "@/components/adminComponent/AllTodosList";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/actions/todos", () => ({
  deleteTodo: vi.fn(),
  editTodo: vi.fn(),
  toggleDone: vi.fn(),
}));

const users = [
  { id: "1", name: "Admin", email: "admin@todo.ge", role: "ADMIN" as const },
  { id: "2", name: "Giorgi", email: "user@todo.ge", role: "USER" as const },
];

const todos: Todos[] = [
  { id: "a", title: "Admin open", done: false, userId: "1", createdAt: "2026-11-22T10:00:00.000Z" },
  { id: "b", title: "Giorgi open", done: false, userId: "2", createdAt: "2026-11-22T10:00:00.000Z" },
  { id: "c", title: "Giorgi done", done: true, userId: "2", createdAt: "2026-11-22T10:00:00.000Z" },
  { id: "d", title: "Orphan task", done: false, userId: "99", createdAt: "2026-11-22T10:00:00.000Z" },
];

const titles = () =>
  within(screen.getByRole("list"))
    .getAllByRole("listitem")
    .map((li) => li.querySelector("p")?.textContent);

describe("AllTodosList", () => {
  it("shows everyone's tasks with their owner", () => {
    render(<AllTodosList todos={todos} users={users} />);

    expect(titles()).toHaveLength(4);
    expect(screen.getByText("4 of 4")).toBeInTheDocument();
    expect(within(screen.getByText("Giorgi open").closest("li")!).getByText("Giorgi")).toBeInTheDocument();
  });

  it("shows 'Unknown' when the owner no longer exists", () => {
    render(<AllTodosList todos={todos} users={users} />);
    expect(within(screen.getByText("Orphan task").closest("li")!).getByText("Unknown")).toBeInTheDocument();
  });

  it("filters by user", async () => {
    const user = userEvent.setup();
    render(<AllTodosList todos={todos} users={users} />);

    await user.selectOptions(screen.getByLabelText("Filter by user"), "Giorgi");

    expect(titles()).toEqual(["Giorgi open", "Giorgi done"]);
    expect(screen.getByText("2 of 4")).toBeInTheDocument();
  });

  it("combines the user filter with the status filter", async () => {
    const user = userEvent.setup();
    render(<AllTodosList todos={todos} users={users} />);

    await user.selectOptions(screen.getByLabelText("Filter by user"), "Giorgi");
    await user.click(screen.getByRole("button", { name: "Completed" }));

    expect(titles()).toEqual(["Giorgi done"]);
  });

  it("shows an empty state when nothing matches", async () => {
    const user = userEvent.setup();
    render(<AllTodosList todos={todos} users={users} />);

    await user.selectOptions(screen.getByLabelText("Filter by user"), "Admin");
    await user.click(screen.getByRole("button", { name: "Completed" }));

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
    expect(screen.getByText("No tasks found")).toBeInTheDocument();
  });
});
