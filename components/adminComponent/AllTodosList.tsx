"use client";

import { formatDate } from "@/lib/formatDate";
import { useState } from "react";
import TodoFilters from "../homeComponent/TodoFilters";
import TodoItem from "../homeComponent/TodoItem";
import type { Filter } from "../homeComponent/TodoList";

type AllTodosListProps = {
  todos: Todos[];
  users: Omit<AllUser, "password">[];
};

const STATUS: Record<Filter, (todo: Todos) => boolean> = {
  All: () => true,
  Active: (todo) => !todo.done,
  Completed: (todo) => todo.done,
};

export default function AllTodosList({ todos, users }: AllTodosListProps) {
  const [userId, setUserId] = useState("all");
  const [filter, setFilter] = useState<Filter>("All");

  const visibleTodos = todos
    .filter((t) => userId === "all" || t.userId === userId)
    .filter(STATUS[filter]);

  const getOwner = (id: string) => users.find((u) => u.id === id)?.name ?? "Unknown";

  return (
    <section className="rounded-card border border-border bg-surface p-4 shadow-card tablet:p-5">
      <div className="mb-4 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-title font-semibold">All tasks</h2>
          <span className="text-caption text-muted">
            {visibleTodos.length} of {todos.length}
          </span>
        </div>

        <div className="flex flex-col gap-3 tablet:flex-row tablet:items-center tablet:justify-between">
          <select
            name="user"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            aria-label="Filter by user"
            className="h-10 rounded-control border border-border bg-bg px-3 text-body outline-none focus:border-primary focus:ring-4 focus:ring-primary-soft"
          >
            <option value="all">All users</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>

          <TodoFilters filter={filter} setFilter={setFilter} />
        </div>
      </div>

      {visibleTodos.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-control border border-dashed border-border px-4 py-10 text-center">
          <p className="text-body font-semibold">No tasks found</p>
          <p className="text-caption text-muted">Try another user or status filter.</p>
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
              owner={getOwner(t.userId)}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
