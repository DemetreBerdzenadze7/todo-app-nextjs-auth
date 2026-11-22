import StatCard from "../sharedComponent/StatCard";

type AdminStatsProps = {
  users: number;
  total: number;
  active: number;
  done: number;
};

export default function AdminStats({ users, total, active, done }: AdminStatsProps) {
  return (
    <section className="grid grid-cols-2 gap-3 tablet:grid-cols-4 tablet:gap-4">
      <StatCard label="Users" value={users} tone="primary" />
      <StatCard label="Total tasks" value={total} tone="primary" />
      <StatCard label="Active" value={active} tone="warning" />
      <StatCard label="Done" value={done} tone="success" />
    </section>
  );
}
