"use client";

import { formatDate } from "@/lib/formatDate";
import TodoFilters from "./TodoFilters";
import TodoItem from "./TodoItem";
import { useState } from "react";

type TodoListProps = {
  todos: Todos[];
};

export type Filter = "All" | "Active" | "Completed";

const EMPTY_MESSAGES: Record<Filter, { title: string; text: string }> = {
  All: { title: "No tasks yet", text: "Add your first task above to get started." },
  Active: { title: "No active tasks", text: "You're all caught up — nice work!" },
  Completed: { title: "No completed tasks", text: "Finish a task and it will show up here." },
};

export default function TodoList({ todos }: TodoListProps) {
  const [filter, setFilter] = useState<Filter>("All");
  const visibleTodos = todos.filter(
    (todo) =>
      filter === "All" || (filter === "Active" ? !todo.done : todo.done),
  );
  return (
    <section className="rounded-card border border-border bg-surface p-4 shadow-card tablet:p-5">
      <div className="mb-4 flex flex-col gap-3 tablet:flex-row tablet:items-center tablet:justify-between">
        <h2 className="text-title font-semibold">Task list</h2>
        <TodoFilters filter={filter} setFilter={setFilter} />
      </div>

      {visibleTodos.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-control border border-dashed border-border px-4 py-10 text-center">
          <span className="grid size-12 place-items-center rounded-full bg-surface-muted text-muted">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-6" aria-hidden>
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <p className="text-body font-semibold">{EMPTY_MESSAGES[filter].title}</p>
          <p className="text-caption text-muted">{EMPTY_MESSAGES[filter].text}</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {visibleTodos.map((t) => (
            <TodoItem
              key={t.id}
              id={t.id}
              title={t.title}
              date={formatDate(t.createdAt)}
              done={t.done}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
