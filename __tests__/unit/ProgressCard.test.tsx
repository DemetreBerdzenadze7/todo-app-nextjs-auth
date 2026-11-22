import ProgressCard from "@/components/homeComponent/ProgressCard";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("ProgressCard", () => {
  it("shows the rounded percentage and exposes it to screen readers", () => {
    render(<ProgressCard total={3} done={1} />);

    expect(screen.getByText("33%")).toBeInTheDocument();
    expect(screen.getByText("1 of 3 completed")).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "33");
  });

  it("uses singular 'task' when one is left", () => {
    render(<ProgressCard total={2} done={1} />);
    expect(screen.getByText("1 task left")).toBeInTheDocument();
  });

  it("celebrates when everything is done", () => {
    render(<ProgressCard total={2} done={2} />);
    expect(screen.getByText("100%")).toBeInTheDocument();
    expect(screen.getByText(/All tasks completed/)).toBeInTheDocument();
  });

  it("shows 0% and a hint when there are no tasks", () => {
    render(<ProgressCard total={0} done={0} />);
    expect(screen.getByText("0%")).toBeInTheDocument();
    expect(screen.getByText(/No tasks yet/)).toBeInTheDocument();
  });
});
