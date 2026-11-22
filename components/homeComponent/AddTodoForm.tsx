"use client";

import { addTodo } from "@/lib/actions/todos";
import { SubmitEvent, useEffect, useState, useTransition } from "react";

export default function AddTodoForm() {
  const [todo, setTodo] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!success) return;
    const timer = setTimeout(() => setSuccess(""), 2000);
    return () => clearTimeout(timer);
  }, [success]);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const title = todo.trim();

    startTransition(async () => {
      try {
        const result = await addTodo(title);

        if ("error" in result) {
          setSuccess("");
          setError(result.error);
          return;
        }

        setTodo("");
        setError("");
        setSuccess(`"${title}" was added to your list`);
      } catch {
        setSuccess("");
        setError("Couldn't add the task. Check your connection and try again.");
      }
    });
  };
  return (
    <section className="rounded-card border border-border bg-surface p-4 shadow-card tablet:p-5">
      <form
        className="flex flex-col gap-3 tablet:flex-row"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="title"
          value={todo}
          onChange={(e) => {
            setTodo(e.target.value);
            if (error) setError("");
          }}
          aria-invalid={!!error}
          aria-describedby={error ? "add-todo-error" : undefined}
          placeholder="New task..."
          className="h-12 flex-1 rounded-control border border-border bg-bg px-4 text-body outline-none placeholder:text-muted focus:border-primary focus:ring-4 focus:ring-primary-soft aria-invalid:border-danger aria-invalid:focus:ring-danger-soft"
        />
        <button
          type="submit"
          disabled={isPending}
          className="h-12 rounded-control bg-primary px-6 text-body font-semibold text-on-primary hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Adding..." : "+ Add"}
        </button>
      </form>

      {error && (
        <p
          id="add-todo-error"
          role="alert"
          className="mt-3 rounded-control bg-danger-soft px-4 py-3 text-caption font-medium text-danger"
        >
          {error}
        </p>
      )}

      {success && (
        <p
          role="status"
          className="mt-3 flex items-center gap-2 rounded-control bg-success-soft px-4 py-3 text-caption font-medium text-success"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="size-4 shrink-0"
            aria-hidden
          >
            <path
              d="M5 12.5l4.5 4.5L19 7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {success}
        </p>
      )}
    </section>
  );
}
