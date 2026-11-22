import { formatDate } from "@/lib/formatDate";
import AdminTodoItem from "./AdminTodoItem";

type AllTodosListProps = {
  todos: Todos[];
  users: Omit<AllUser, "password">[];
};

export default function AllTodosList({ todos, users }: AllTodosListProps) {
  return (
    <section className="rounded-card border border-border bg-surface p-4 shadow-card tablet:p-5">
      <div className="mb-4 flex flex-col gap-3 tablet:flex-row tablet:items-center tablet:justify-between">
        <h2 className="text-title font-semibold">All tasks</h2>

        {/* Filter by user (visual only) */}
        <select
          name="user"
          className="h-10 rounded-control border border-border bg-bg px-3 text-body outline-none focus:border-primary focus:ring-4 focus:ring-primary-soft"
          defaultValue="all"
        >
          <option value="all">All users</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>
      </div>

      <ul className="flex flex-col gap-2">
        {todos.map((t) => (
          <AdminTodoItem
            key={t.id}
            title={t.title}
            done={t.done}
            owner={users.find((u) => u.id === t.userId)?.name ?? "Unknown"}
            date={formatDate(t.createdAt)}
          />
        ))}
      </ul>
    </section>
  );
}
