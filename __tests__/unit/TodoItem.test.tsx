import TodoItem from "@/components/homeComponent/TodoItem";
import { deleteTodo, editTodo, toggleDone } from "@/lib/actions/todos";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/actions/todos", () => ({
  deleteTodo: vi.fn(),
  editTodo: vi.fn(),
  toggleDone: vi.fn(),
}));

const mockEdit = vi.mocked(editTodo);

const renderItem = (props: Partial<Parameters<typeof TodoItem>[0]> = {}) =>
  render(
    <ul>
      <TodoItem id="7" title="Buy milk" date="22 Nov, 2026" done={false} {...props} />
    </ul>,
  );

beforeEach(() => {
  vi.clearAllMocks();
});

describe("TodoItem", () => {
  it("shows the title, date and an accessible toggle", () => {
    renderItem();

    expect(screen.getByText("Buy milk")).toBeInTheDocument();
    expect(screen.getByText("22 Nov, 2026")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Mark as done" })).toHaveAttribute("aria-pressed", "false");
  });

  it("labels the toggle differently when the todo is done", () => {
    renderItem({ done: true });
    expect(screen.getByRole("button", { name: "Mark as not done" })).toHaveAttribute("aria-pressed", "true");
  });

  it("shows the owner only when given (admin page)", () => {
    const { unmount } = renderItem();
    expect(screen.queryByText("Giorgi")).not.toBeInTheDocument();
    unmount();

    renderItem({ owner: "Giorgi" });
    expect(screen.getByText("Giorgi")).toBeInTheDocument();
  });

  it("calls toggleDone and deleteTodo with the todo id", async () => {
    const user = userEvent.setup();
    renderItem();

    await user.click(screen.getByRole("button", { name: "Mark as done" }));
    expect(toggleDone).toHaveBeenCalledWith("7");

    await user.click(screen.getByRole("button", { name: "Delete" }));
    expect(deleteTodo).toHaveBeenCalledWith("7");
  });

  it("saves an edited title with Enter", async () => {
    mockEdit.mockResolvedValue({ success: true });
    const user = userEvent.setup();
    renderItem();

    await user.click(screen.getByRole("button", { name: "Edit" }));
    const input = screen.getByRole("textbox", { name: "Edit task title" });
    expect(input).toHaveFocus();

    await user.clear(input);
    await user.type(input, "Buy oat milk{Enter}");

    expect(mockEdit).toHaveBeenCalledWith("7", "Buy oat milk");
    expect(await screen.findByText("Buy milk")).toBeInTheDocument();
  });

  it("cancels editing with Escape without calling the server", async () => {
    const user = userEvent.setup();
    renderItem();

    await user.click(screen.getByRole("button", { name: "Edit" }));
    await user.type(screen.getByRole("textbox", { name: "Edit task title" }), " changed{Escape}");

    expect(mockEdit).not.toHaveBeenCalled();
    expect(screen.getByText("Buy milk")).toBeInTheDocument();
  });

  it("does not call the server when the title did not change", async () => {
    const user = userEvent.setup();
    renderItem();

    await user.click(screen.getByRole("button", { name: "Edit" }));
    await user.click(screen.getByRole("button", { name: "Save" }));

    expect(mockEdit).not.toHaveBeenCalled();
  });

  it("keeps the editor open and shows the server error", async () => {
    mockEdit.mockResolvedValue({ error: "Task can't be empty. Please type something first." });
    const user = userEvent.setup();
    renderItem();

    await user.click(screen.getByRole("button", { name: "Edit" }));
    await user.clear(screen.getByRole("textbox", { name: "Edit task title" }));
    await user.click(screen.getByRole("button", { name: "Save" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Task can't be empty");
    expect(screen.getByRole("textbox", { name: "Edit task title" })).toBeInTheDocument();
  });
});
