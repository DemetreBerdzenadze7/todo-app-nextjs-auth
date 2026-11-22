"use client";

import { deleteTodo, editTodo, toggleDone } from "@/lib/actions/todos";
import { KeyboardEvent, useState, useTransition } from "react";

type TodoItemProps = {
  id: string;
  title: string;
  date: string;
  done: boolean;
  owner?: string;
};

export default function TodoItem({ id, title, date, done, owner }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(title);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const startEditing = () => {
    setDraft(title);
    setError("");
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setDraft(title);
    setError("");
    setIsEditing(false);
  };

  const saveEdit = () => {
    if (draft.trim() === title) return cancelEditing();

    startTransition(async () => {
      const result = await editTodo(id, draft);

      if ("error" in result) {
        setError(result.error);
        return;
      }

      setIsEditing(false);
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") saveEdit();
    if (e.key === "Escape") cancelEditing();
  };

  if (isEditing) {
    return (
      <li className="flex flex-col gap-2 rounded-control border border-primary bg-surface px-4 py-3 ring-4 ring-primary-soft">
        <div className="flex flex-col gap-2 tablet:flex-row tablet:items-center">
          <input
            type="text"
            value={draft}
            onChange={(e) => {
              setDraft(e.target.value);
              if (error) setError("");
            }}
            onKeyDown={handleKeyDown}
            autoFocus
            disabled={isPending}
            aria-label="Edit task title"
            aria-invalid={!!error}
            className="h-10 flex-1 rounded-lg border border-border bg-bg px-3 text-body outline-none focus:border-primary aria-invalid:border-danger disabled:opacity-60"
          />

          <div className="flex gap-2">
            <button
              type="button"
              onClick={saveEdit}
              disabled={isPending}
              className="h-10 flex-1 rounded-lg bg-primary px-4 text-body font-semibold text-on-primary hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60 tablet:flex-none"
            >
              {isPending ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={cancelEditing}
              disabled={isPending}
              className="h-10 flex-1 rounded-lg border border-border px-4 text-body font-medium hover:bg-surface-muted disabled:opacity-60 tablet:flex-none"
            >
              Cancel
            </button>
          </div>
        </div>

        {error ? (
          <p role="alert" className="text-caption font-medium text-danger">
            {error}
          </p>
        ) : (
          <p className="text-caption text-muted">
            Press Enter to save, Esc to cancel
          </p>
        )}
      </li>
    );
  }

  return (
    <li className="group flex items-center gap-3 rounded-control border border-border bg-surface px-4 py-3 transition-colors hover:border-primary/40">
      <button
        type="button"
        onClick={() => toggleDone(id)}
        aria-label={done ? "Mark as not done" : "Mark as done"}
        aria-pressed={done}
        className={`grid size-6 shrink-0 cursor-pointer place-items-center rounded-full border-2 transition-colors outline-none focus-visible:ring-4 focus-visible:ring-primary-soft ${
          done
            ? "border-success bg-success text-surface hover:opacity-80"
            : "border-border hover:border-success hover:bg-success-soft"
        }`}
      >
        {done && (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="size-3.5"
            aria-hidden
          >
            <path
              d="M5 12.5l4.5 4.5L19 7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      <div className="min-w-0 flex-1">
        <p
          className={`truncate text-body font-medium ${done ? "text-muted line-through" : ""}`}
        >
          {title}
        </p>
        <p className="flex items-center gap-1.5 text-caption text-muted">
          {owner && (
            <>
              <span className="font-medium text-primary">{owner}</span>
              <span aria-hidden>·</span>
            </>
          )}
          <span>{date}</span>
        </p>
      </div>

      <div className="flex items-center gap-1 desktop:opacity-0 desktop:transition-opacity desktop:group-hover:opacity-100 desktop:focus-within:opacity-100">
        <button
          type="button"
          onClick={startEditing}
          aria-label="Edit"
          className="grid size-8 place-items-center rounded-lg text-muted hover:bg-surface-muted hover:text-text"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="size-4"
            aria-hidden
          >
            <path d="M4 20h4L19 9l-4-4L4 16v4z" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={() => deleteTodo(id)}
          type="button"
          aria-label="Delete"
          className="grid size-8 place-items-center rounded-lg text-muted hover:bg-danger-soft hover:text-danger"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="size-4"
            aria-hidden
          >
            <path
              d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </li>
  );
}
