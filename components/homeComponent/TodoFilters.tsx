"use client";

import type { Filter } from "./TodoList";

const filters: Filter[] = ["All", "Active", "Completed"];

interface Props {
  filter: Filter;
  setFilter: (filter: Filter) => void;
}

export default function TodoFilters({ filter, setFilter }: Props) {
  return (
    <div className="flex rounded-control bg-surface-muted p-1">
      {filters.map((f) => (
        <button
          key={f}
          type="button"
          onClick={() => setFilter(f)}
          className={`flex-1 rounded-lg px-3 py-1.5 text-caption font-medium tablet:flex-none tablet:text-body ${
            f === filter
              ? "bg-surface text-text shadow-card"
              : "text-muted hover:text-text"
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
