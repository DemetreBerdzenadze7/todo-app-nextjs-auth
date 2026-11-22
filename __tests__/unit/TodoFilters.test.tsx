import TodoFilters from "@/components/homeComponent/TodoFilters";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

describe("TodoFilters", () => {
  it("renders all three filters", () => {
    render(<TodoFilters filter="All" setFilter={vi.fn()} />);

    expect(screen.getAllByRole("button").map((b) => b.textContent)).toEqual(["All", "Active", "Completed"]);
  });

  it("highlights only the selected filter", () => {
    render(<TodoFilters filter="Active" setFilter={vi.fn()} />);

    expect(screen.getByRole("button", { name: "Active" })).toHaveClass("bg-surface");
    expect(screen.getByRole("button", { name: "All" })).not.toHaveClass("bg-surface");
  });

  it("reports the clicked filter to the parent", async () => {
    const setFilter = vi.fn();
    render(<TodoFilters filter="All" setFilter={setFilter} />);

    await userEvent.click(screen.getByRole("button", { name: "Completed" }));

    expect(setFilter).toHaveBeenCalledWith("Completed");
  });
});
