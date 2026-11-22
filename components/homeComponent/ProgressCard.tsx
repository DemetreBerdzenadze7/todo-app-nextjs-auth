type ProgressCardProps = {
  total: number;
  done: number;
};

export default function ProgressCard({ total, done }: ProgressCardProps) {
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <section className="rounded-card border border-border bg-surface p-5 shadow-card">
      <h2 className="text-title font-semibold">Progress</h2>
      <p className="mt-1 text-caption text-muted">
        {done} of {total} completed
      </p>
      <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-surface-muted">
        <div className="h-full rounded-full bg-primary" style={{ width: `${percent}%` }} />
      </div>
      <p className="mt-2 text-right text-heading font-bold text-primary">{percent}%</p>
    </section>
  );
}
