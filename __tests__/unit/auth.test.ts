import options from "@/app/api/auth/[...nextauth]/option";
import { getUsers } from "@/lib/users";
import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/users", () => ({ getUsers: vi.fn() }));

const users: AllUser[] = [
  { id: "1", name: "Admin", email: "admin@todo.ge", password: "1234", role: "ADMIN" },
  { id: "2", name: "Giorgi", email: "user@todo.ge", password: "123", role: "USER" },
];

type Authorize = (credentials?: Record<string, string>) => Promise<User | null>;
const authorize = (options.providers[0] as unknown as { options: { authorize: Authorize } }).options.authorize;

const jwt = options.callbacks!.jwt! as (args: { token: JWT; user?: User }) => Promise<JWT>;
const session = options.callbacks!.session! as (args: { token: JWT; session: Session }) => Promise<Session>;

beforeEach(() => {
  vi.mocked(getUsers).mockResolvedValue(structuredClone(users));
});

describe("credentials authorize", () => {
  it("returns the user without the password for correct credentials", async () => {
    const user = await authorize({ username: "Giorgi", password: "123" });

    expect(user).toEqual({ id: "2", name: "Giorgi", email: "user@todo.ge", role: "USER" });
    expect(user).not.toHaveProperty("password");
  });

  it("returns null for a wrong password", async () => {
    expect(await authorize({ username: "Giorgi", password: "1234" })).toBeNull();
  });

  it("returns null for an unknown user", async () => {
    expect(await authorize({ username: "Nobody", password: "123" })).toBeNull();
  });

  it("returns null when no credentials are sent", async () => {
    expect(await authorize(undefined)).toBeNull();
  });

  it("is case-sensitive for the username", async () => {
    expect(await authorize({ username: "giorgi", password: "123" })).toBeNull();
  });
});

describe("jwt callback", () => {
  it("copies id, name and role into the token on login", async () => {
    const token = await jwt({
      token: {} as JWT,
      user: { id: "1", name: "Admin", email: "admin@todo.ge", role: "ADMIN" },
    });

    expect(token).toMatchObject({ sub: "1", name: "Admin", role: "ADMIN" });
  });

  it("keeps the existing token on later requests (no user)", async () => {
    const existing = { sub: "2", name: "Giorgi", role: "USER" } as JWT;
    expect(await jwt({ token: existing })).toEqual(existing);
  });
});

describe("session callback", () => {
  it("exposes id, name and role from the token on the session", async () => {
    const result = await session({
      token: { sub: "2", name: "Giorgi", role: "USER" } as JWT,
      session: { user: { email: "user@todo.ge" }, expires: "" } as Session,
    });

    expect(result.user).toEqual({ id: "2", name: "Giorgi", email: "user@todo.ge", role: "USER" });
  });
});
