import DemoAccounts from "@/components/loginComponent/DemoAccounts";
import { render, screen } from "@testing-library/react";
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const realUsers: AllUser[] = JSON.parse(readFileSync(path.join(process.cwd(), "data", "users.json"), "utf-8"));

describe("DemoAccounts", () => {
  it("matches the real accounts in users.json, so the demo logins always work", () => {
    render(<DemoAccounts />);

    for (const role of ["ADMIN", "USER"] as const) {
      const user = realUsers.find((u) => u.role === role)!;
      expect(screen.getByText(`${user.name} / ${user.password}`)).toBeInTheDocument();
    }
  });
});
