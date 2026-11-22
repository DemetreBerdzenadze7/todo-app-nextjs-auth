import { formatDate } from "@/lib/formatDate";
import { describe, expect, it } from "vitest";

describe("formatDate", () => {
  it("formats an ISO date as 'D MMM, YYYY'", () => {
    expect(formatDate("2026-11-22T12:00:00.000Z")).toBe("22 Nov, 2026");
  });

  it("does not pad single-digit days", () => {
    expect(formatDate("2026-10-05T12:00:00.000Z")).toBe("5 Oct, 2026");
  });
});
