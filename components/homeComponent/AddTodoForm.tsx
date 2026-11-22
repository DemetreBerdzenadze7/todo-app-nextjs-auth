export default function AddTodoForm() {
  return (
    <section className="rounded-card border border-border bg-surface p-4 shadow-card tablet:p-5">
      <form className="flex flex-col gap-3 tablet:flex-row">
        <input
          type="text"
          name="title"
          placeholder="New task..."
          className="h-12 flex-1 rounded-control border border-border bg-bg px-4 text-body outline-none placeholder:text-muted focus:border-primary focus:ring-4 focus:ring-primary-soft"
        />
        <button
          type="button"
          className="h-12 rounded-control bg-primary px-6 text-body font-semibold text-on-primary hover:bg-primary-hover"
        >
          + Add
        </button>
      </form>
    </section>
  );
}
