import StatCard from "../sharedComponent/StatCard";

type StatsProps = {
  total: number;
  active: number;
  done: number;
};

export default function Stats({ total, active, done }: StatsProps) {
  return (
    <section className="grid grid-cols-3 gap-3 tablet:gap-4">
      <StatCard label="Total" value={total} tone="primary" />
      <StatCard label="Active" value={active} tone="warning" />
      <StatCard label="Done" value={done} tone="success" />
    </section>
  );
}
