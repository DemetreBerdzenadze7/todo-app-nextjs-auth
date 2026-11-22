import AdminStats from "@/components/adminComponent/AdminStats";
import AdminTitle from "@/components/adminComponent/AdminTitle";
import AllTodosList from "@/components/adminComponent/AllTodosList";
import UsersList from "@/components/adminComponent/UsersList";
import Header from "@/components/sharedComponent/Header";
import AdminSkeleton from "@/components/skeletonComponent/AdminSkeleton";
import { hasPermission } from "@/lib/permissions";
import { getTodos } from "@/lib/tasks";
import { getUsers } from "@/lib/users";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import options from "../api/auth/[...nextauth]/option";

async function AdminContent() {
  const session = await getServerSession(options);

  if (!session) redirect("/login");
  if (!hasPermission(session.user.role, "user:read")) redirect("/");

  const [allUsers, todos] = await Promise.all([getUsers(), getTodos()]);

  const users = allUsers.map(({ id, name, email, role }) => ({ id, name, email, role }));

  const total = todos.length;
  const done = todos.filter((t) => t.done).length;

  return (
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
  );
}

export default function AdminPage() {
  return (
    <>
      <Header />

      <Suspense fallback={<AdminSkeleton />}>
        <AdminContent />
      </Suspense>
    </>
  );
}
