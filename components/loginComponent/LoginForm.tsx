"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, SubmitEvent, useState } from "react";

interface UserState {
  username: string;
  password: string;
}

const inputClass =
  "h-12 rounded-control border border-border bg-bg px-4 text-body outline-none placeholder:text-muted focus:border-primary focus:ring-4 focus:ring-primary-soft";

export default function LoginForm() {
  const [user, setUser] = useState<UserState>({
    username: "",
    password: "",
  });

  const [isError, setIsError] = useState<boolean>(false);

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await signIn("credentials", {
      username: user.username,
      password: user.password,
      redirect: false,
    });

    if (!response?.ok) {
      setIsError(true);
      setUser({ ...user, password: "" });
      return;
    }

    setIsError(false);
    setUser({
      username: "",
      password: "",
    });

    router.push("/");
    router.refresh();
  };
  return (
    <div className="rounded-card border border-border bg-surface p-6 shadow-card tablet:p-8 desktop:border-0 desktop:bg-transparent desktop:p-0 desktop:shadow-none">
      <h1 className="text-heading font-bold tablet:text-display">Log in</h1>
      <p className="mt-1 text-body text-muted">Enter your credentials</p>

      <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-1.5">
          <span className="text-body font-medium">Username</span>
          <input
            type="text"
            name="username"
            placeholder="e.g. Giorgi"
            autoComplete="username"
            value={user.username}
            onChange={handleChange}
            className={inputClass}
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-body font-medium">Password</span>
          <input
            type="password"
            name="password"
            placeholder="••••••"
            autoComplete="current-password"
            value={user.password}
            onChange={handleChange}
            className={inputClass}
          />
        </label>

        {isError && (
          <p className="hidden rounded-control bg-danger-soft px-4 py-3 text-caption font-medium text-danger">
            Invalid username or password
          </p>
        )}
        <button
          type="submit"
          className="mt-2 h-12 rounded-control bg-primary text-body font-semibold text-on-primary hover:bg-primary-hover"
        >
          Log in
        </button>
      </form>
    </div>
  );
}
