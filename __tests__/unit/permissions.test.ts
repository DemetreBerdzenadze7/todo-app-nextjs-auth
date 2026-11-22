import { hasPermission, ROLE_PERMISSIONS } from "@/lib/permissions";
import { describe, expect, it } from "vitest";

describe("hasPermission", () => {
  it("lets USER manage only their own todos", () => {
    expect(hasPermission("USER", "todo:create")).toBe(true);
    expect(hasPermission("USER", "todo:update:own")).toBe(true);
    expect(hasPermission("USER", "todo:delete:own")).toBe(true);

    expect(hasPermission("USER", "todo:update:any")).toBe(false);
    expect(hasPermission("USER", "todo:delete:any")).toBe(false);
    expect(hasPermission("USER", "user:read")).toBe(false);
  });

  it("gives ADMIN every permission USER has, plus more", () => {
    for (const permission of ROLE_PERMISSIONS.USER) {
      expect(hasPermission("ADMIN", permission)).toBe(true);
    }
    expect(hasPermission("ADMIN", "todo:delete:any")).toBe(true);
    expect(hasPermission("ADMIN", "user:read")).toBe(true);
  });
});
