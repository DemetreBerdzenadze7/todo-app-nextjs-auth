type StatCardProps = {
  label: string;
  value: number;
  tone: "primary" | "warning" | "success";
};

const tones = {
  primary: "bg-primary-soft text-primary",
  warning: "bg-warning-soft text-warning",
  success: "bg-success-soft text-success",
};

export default function StatCard({ label, value, tone }: StatCardProps) {
  return (
    <div className="rounded-card border border-border bg-surface p-3 shadow-card tablet:p-5">
      <span className={`inline-block rounded-full px-2 py-0.5 text-caption font-semibold ${tones[tone]}`}>
        {label}
      </span>
      <p className="mt-2 text-heading font-bold tablet:text-display">{value}</p>
    </div>
  );
}
