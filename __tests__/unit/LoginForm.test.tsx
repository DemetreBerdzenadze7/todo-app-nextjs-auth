import LoginForm from "@/components/loginComponent/LoginForm";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { signIn } from "next-auth/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const push = vi.fn();
const refresh = vi.fn();

vi.mock("next-auth/react", () => ({ signIn: vi.fn() }));
vi.mock("next/navigation", () => ({ useRouter: () => ({ push, refresh }) }));

const mockSignIn = vi.mocked(signIn);

beforeEach(() => {
  vi.clearAllMocks();
});

const fillAndSubmit = async (username: string, password: string) => {
  const user = userEvent.setup();
  render(<LoginForm />);
  await user.type(screen.getByLabelText("Username"), username);
  await user.type(screen.getByLabelText("Password"), password);
  await user.click(screen.getByRole("button", { name: "Log in" }));
};

describe("LoginForm", () => {
  it("signs in with credentials without a full page redirect", async () => {
    mockSignIn.mockResolvedValue({ ok: true, error: null, status: 200, url: null });

    await fillAndSubmit("Giorgi", "123");

    expect(mockSignIn).toHaveBeenCalledWith("credentials", {
      username: "Giorgi",
      password: "123",
      redirect: false,
    });
    expect(push).toHaveBeenCalledWith("/");
  });

  it("shows an error and clears the password on wrong credentials", async () => {
    mockSignIn.mockResolvedValue({ ok: false, error: "CredentialsSignin", status: 401, url: null });

    await fillAndSubmit("Giorgi", "wrong");

    expect(await screen.findByText("Invalid username or password")).toBeVisible();
    expect(screen.getByLabelText("Password")).toHaveValue("");
    expect(screen.getByLabelText("Username")).toHaveValue("Giorgi");
    expect(push).not.toHaveBeenCalled();
  });
});
