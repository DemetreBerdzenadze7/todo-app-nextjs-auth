import TodoList from "@/components/homeComponent/TodoList";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/actions/todos", () => ({
  deleteTodo: vi.fn(),
  editTodo: vi.fn(),
  toggleDone: vi.fn(),
}));

const todos: Todos[] = [
  { id: "1", title: "Active task", done: false, userId: "2", createdAt: "2026-11-22T10:00:00.000Z" },
  { id: "2", title: "Finished task", done: true, userId: "2", createdAt: "2026-11-21T10:00:00.000Z" },
];

const visibleTitles = () =>
  within(screen.getByRole("list"))
    .getAllByRole("listitem")
    .map((li) => li.querySelector("p")?.textContent);

describe("TodoList", () => {
  it("shows every todo with a formatted date by default", () => {
    render(<TodoList todos={todos} />);

    expect(visibleTitles()).toEqual(["Active task", "Finished task"]);
    expect(screen.getByText("22 Nov, 2026")).toBeInTheDocument();
  });

  it("filters by Active and Completed", async () => {
    const user = userEvent.setup();
    render(<TodoList todos={todos} />);

    await user.click(screen.getByRole("button", { name: "Active" }));
    expect(visibleTitles()).toEqual(["Active task"]);

    await user.click(screen.getByRole("button", { name: "Completed" }));
    expect(visibleTitles()).toEqual(["Finished task"]);

    await user.click(screen.getByRole("button", { name: "All" }));
    expect(visibleTitles()).toHaveLength(2);
  });

  it("shows an empty state when there are no todos", () => {
    render(<TodoList todos={[]} />);

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
    expect(screen.getByText("No tasks yet")).toBeInTheDocument();
  });

  it("shows a filter-specific empty state", async () => {
    const user = userEvent.setup();
    render(<TodoList todos={[todos[1]]} />);

    await user.click(screen.getByRole("button", { name: "Active" }));
    expect(screen.getByText("No active tasks")).toBeInTheDocument();
  });
});
