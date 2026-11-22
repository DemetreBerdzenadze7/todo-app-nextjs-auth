import AdminStats from "@/components/adminComponent/AdminStats";
import Stats from "@/components/homeComponent/Stats";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

const valueOf = (label: string) => screen.getByText(label).nextElementSibling?.textContent;

describe("Stats", () => {
  it("shows total, active and done counts", () => {
    render(<Stats total={5} active={3} done={2} />);

    expect(valueOf("Total")).toBe("5");
    expect(valueOf("Active")).toBe("3");
    expect(valueOf("Done")).toBe("2");
  });
});

describe("AdminStats", () => {
  it("also shows the number of users", () => {
    render(<AdminStats users={2} total={6} active={4} done={2} />);

    expect(valueOf("Users")).toBe("2");
    expect(valueOf("Total tasks")).toBe("6");
    expect(valueOf("Active")).toBe("4");
    expect(valueOf("Done")).toBe("2");
  });
});
