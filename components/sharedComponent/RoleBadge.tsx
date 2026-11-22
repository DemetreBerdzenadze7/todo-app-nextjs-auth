type RoleBadgeProps = {
  role: Role;
};

export default function RoleBadge({ role }: RoleBadgeProps) {
  const tone = role === "ADMIN" ? "bg-warning-soft text-warning" : "bg-primary-soft text-primary";

  return <span className={`rounded-full px-2.5 py-0.5 text-caption font-semibold ${tone}`}>{role}</span>;
}
