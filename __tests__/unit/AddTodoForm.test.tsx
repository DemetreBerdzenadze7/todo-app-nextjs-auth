import AddTodoForm from "@/components/homeComponent/AddTodoForm";
import { addTodo } from "@/lib/actions/todos";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/actions/todos", () => ({ addTodo: vi.fn() }));

const mockAdd = vi.mocked(addTodo);

beforeEach(() => {
  vi.clearAllMocks();
  vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
  vi.useRealTimers();
});

const setup = () => {
  const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
  render(<AddTodoForm />);
  return { user, input: screen.getByPlaceholderText("New task...") };
};

describe("AddTodoForm", () => {
  it("sends the trimmed title, clears the input and shows a success message for 2 seconds", async () => {
    mockAdd.mockResolvedValue({ success: true });
    const { user, input } = setup();

    await user.type(input, "  Buy milk  ");
    await user.click(screen.getByRole("button", { name: "+ Add" }));

    expect(mockAdd).toHaveBeenCalledWith("Buy milk");
    expect(await screen.findByRole("status")).toHaveTextContent('"Buy milk" was added to your list');
    expect(input).toHaveValue("");

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("shows the server error and keeps the typed text", async () => {
    mockAdd.mockResolvedValue({ error: "Task can't be empty. Please type something first." });
    const { user, input } = setup();

    await user.type(input, "   ");
    await user.click(screen.getByRole("button", { name: "+ Add" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Task can't be empty");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("hides the error as soon as the user starts typing again", async () => {
    mockAdd.mockResolvedValue({ error: "Task can't be empty. Please type something first." });
    const { user, input } = setup();

    await user.click(screen.getByRole("button", { name: "+ Add" }));
    expect(await screen.findByRole("alert")).toBeInTheDocument();

    await user.type(input, "B");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("shows a fallback message when the request crashes", async () => {
    mockAdd.mockRejectedValue(new Error("network down"));
    const { user, input } = setup();

    await user.type(input, "Buy milk");
    await user.click(screen.getByRole("button", { name: "+ Add" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Couldn't add the task");
  });
});
