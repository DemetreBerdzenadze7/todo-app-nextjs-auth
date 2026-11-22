"use client";

import { formatDate } from "@/lib/formatDate";
import TodoFilters from "./TodoFilters";
import TodoItem from "./TodoItem";
import { useState } from "react";

type TodoListProps = {
  todos: Todos[];
};

export type Filter = "All" | "Active" | "Completed";

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

      <ul className="flex flex-col gap-2">
        {visibleTodos.map((t) => (
          <TodoItem
            key={t.id}
            title={t.title}
            date={formatDate(t.createdAt)}
            done={t.done}
          />
        ))}
      </ul>
    </section>
  );
}
