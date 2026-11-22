type TodoItemProps = {
  title: string;
  date: string;
  done: boolean;
};

export default function TodoItem({ title, date, done }: TodoItemProps) {
  return (
    <li className="group flex items-center gap-3 rounded-control border border-border bg-surface px-4 py-3 transition-colors hover:border-primary/40">
      {/* Checkbox (visual only) */}
      <span
        className={`grid size-6 shrink-0 place-items-center rounded-full border-2 ${
          done ? "border-success bg-success text-surface" : "border-border"
        }`}
        aria-hidden
      >
        {done && (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="size-3.5">
            <path d="M5 12.5l4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>

      <div className="min-w-0 flex-1">
        <p className={`truncate text-body font-medium ${done ? "text-muted line-through" : ""}`}>{title}</p>
        <p className="text-caption text-muted">{date}</p>
      </div>

      <div className="flex items-center gap-1 desktop:opacity-0 desktop:transition-opacity desktop:group-hover:opacity-100">
        <button type="button" aria-label="Edit" className="grid size-8 place-items-center rounded-lg text-muted hover:bg-surface-muted hover:text-text">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4">
            <path d="M4 20h4L19 9l-4-4L4 16v4z" strokeLinejoin="round" />
          </svg>
        </button>
        <button type="button" aria-label="Delete" className="grid size-8 place-items-center rounded-lg text-muted hover:bg-danger-soft hover:text-danger">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4">
            <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </li>
  );
}
