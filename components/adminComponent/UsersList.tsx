import UserCard from "./UserCard";

type UsersListProps = {
  users: Omit<AllUser, "password">[];
  todos: Todos[];
};

export default function UsersList({ users, todos }: UsersListProps) {
  return (
    <section className="rounded-card border border-border bg-surface p-4 shadow-card tablet:p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-title font-semibold">Users</h2>
        <span className="text-caption text-muted">{users.length} total</span>
      </div>

      <ul className="flex flex-col gap-2">
        {users.map((u) => (
          <UserCard
            key={u.id}
            name={u.name}
            email={u.email}
            role={u.role}
            taskCount={todos.filter((t) => t.userId === u.id).length}
          />
        ))}
      </ul>
    </section>
  );
}
