type ProgressCardProps = {
  total: number;
  done: number;
};

function getMessage(total: number, done: number) {
  if (total === 0) return "No tasks yet — add your first one!";
  if (done === total) return "All tasks completed 🎉";
  const left = total - done;
  return `${left} ${left === 1 ? "task" : "tasks"} left`;
}

export default function ProgressCard({ total, done }: ProgressCardProps) {
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);
  const isComplete = total > 0 && done === total;

  return (
    <section className="rounded-card border border-border bg-surface p-5 shadow-card">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-title font-semibold">Progress</h2>
        <p className={`text-heading font-bold ${isComplete ? "text-success" : "text-primary"}`}>{percent}%</p>
      </div>

      <p className="mt-1 text-caption text-muted">
        {done} of {total} completed
      </p>

      <div
        role="progressbar"
        aria-label="Tasks completed"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        className="mt-4 h-2.5 overflow-hidden rounded-full bg-surface-muted"
      >
        <div
          className={`h-full rounded-full transition-[width] duration-500 ${isComplete ? "bg-success" : "bg-primary"}`}
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="mt-3 text-caption font-medium text-muted">{getMessage(total, done)}</p>
    </section>
  );
}
