import Greeting from "@/components/homeComponent/Greeting";
import HomeSkeleton from "@/components/skeletonComponent/HomeSkeleton";
import TodoListSkeleton from "@/components/skeletonComponent/TodoListSkeleton";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("TodoListSkeleton", () => {
  it("renders 4 placeholder rows by default", () => {
    render(<TodoListSkeleton />);
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
  });

  it("renders the requested number of rows", () => {
    render(<TodoListSkeleton rows={2} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });
});

describe("HomeSkeleton", () => {
  it("uses pulsing placeholders and no real text", () => {
    const { container } = render(<HomeSkeleton />);

    expect(container.querySelectorAll(".animate-pulse").length).toBeGreaterThan(10);
    expect(container).toHaveTextContent("");
  });
});

describe("Greeting", () => {
  it("greets the user by name", () => {
    render(<Greeting name="Giorgi" />);

    expect(screen.getByText(/Hello, Giorgi/)).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: "My tasks" })).toBeInTheDocument();
  });
});
