import LogoutButton from "@/components/sharedComponent/LogoutButton";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { signOut } from "next-auth/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next-auth/react", () => ({ signOut: vi.fn() }));

describe("LogoutButton", () => {
  it("signs out and sends the user to the login page", async () => {
    render(<LogoutButton />);

    await userEvent.click(screen.getByRole("button", { name: "Log out" }));

    expect(signOut).toHaveBeenCalledWith({ callbackUrl: "/login" });
  });
});
