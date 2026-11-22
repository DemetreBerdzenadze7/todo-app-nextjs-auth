import RoleBadge from "../sharedComponent/RoleBadge";

type UserCardProps = {
  name: string;
  email: string;
  role: Role;
  taskCount: number;
};

export default function UserCard({ name, email, role, taskCount }: UserCardProps) {
  return (
    <li className="flex items-center gap-3 rounded-control border border-border px-4 py-3">
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary-soft text-body font-bold text-primary">
        {name.charAt(0).toUpperCase()}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-body font-semibold">{name}</p>
          <RoleBadge role={role} />
        </div>
        <p className="truncate text-caption text-muted">{email}</p>
      </div>

      <div className="text-right">
        <p className="text-title font-bold">{taskCount}</p>
        <p className="text-caption text-muted">tasks</p>
      </div>
    </li>
  );
}
