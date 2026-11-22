const filters = ["All", "Active", "Completed"];

export default function TodoFilters() {
  return (
    <div className="flex rounded-control bg-surface-muted p-1">
      {filters.map((f, i) => (
        <button
          key={f}
          type="button"
          className={`flex-1 rounded-lg px-3 py-1.5 text-caption font-medium tablet:flex-none tablet:text-body ${
            i === 0 ? "bg-surface text-text shadow-card" : "text-muted hover:text-text"
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
