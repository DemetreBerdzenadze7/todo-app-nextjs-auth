import AdminStats from "@/components/adminComponent/AdminStats";
import AdminTitle from "@/components/adminComponent/AdminTitle";
import AllTodosList from "@/components/adminComponent/AllTodosList";
import UsersList from "@/components/adminComponent/UsersList";
import Header from "@/components/sharedComponent/Header";

// Temporary mock data (design only)
const users: Omit<AllUser, "password">[] = [
  { id: "1", name: "Admin", email: "admin@todo.ge", role: "ADMIN" },
  { id: "2", name: "Giorgi", email: "user@todo.ge", role: "USER" },
];

const todos: Todos[] = [
  { id: "1", title: "Check the admin panel", done: false, userId: "1", createdAt: "2026-11-22T11:00:00.000Z" },
  { id: "2", title: "Review the user list", done: true, userId: "1", createdAt: "2026-11-22T11:10:00.000Z" },
  { id: "3", title: "Finish the Next.js project", done: false, userId: "2", createdAt: "2026-11-22T12:00:00.000Z" },
  { id: "4", title: "Add authentication", done: false, userId: "2", createdAt: "2026-11-22T12:15:00.000Z" },
  { id: "5", title: "Set up Tailwind", done: true, userId: "2", createdAt: "2026-11-22T12:30:00.000Z" },
];

export default function AdminPage() {
  const total = todos.length;
  const done = todos.filter((t) => t.done).length;

  return (
    <>
      <Header />

      <main className="mx-auto w-full max-w-page flex-1 px-gutter py-6 tablet:px-gutter-tablet tablet:py-10">
        <AdminTitle />

        <div className="mb-6">
          <AdminStats users={users.length} total={total} active={total - done} done={done} />
        </div>

        <div className="grid gap-6 desktop:grid-cols-[1fr_24rem] desktop:items-start">
          <AllTodosList todos={todos} users={users} />
          <UsersList users={users} todos={todos} />
        </div>
      </main>
    </>
  );
}
