import AddTodoForm from "@/components/homeComponent/AddTodoForm";
import Greeting from "@/components/homeComponent/Greeting";
import Header from "@/components/sharedComponent/Header";
import ProgressCard from "@/components/homeComponent/ProgressCard";
import RoleCard from "@/components/homeComponent/RoleCard";
import Stats from "@/components/homeComponent/Stats";
import TodoList from "@/components/homeComponent/TodoList";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Suspense, useMemo } from "react";
import { getTodos } from "@/lib/tasks";
import HomeSkeleton from "@/components/skeletonComponent/HomeSkeleton";
import options from "./api/auth/[...nextauth]/option";

async function GetUser() {
  const session = await getServerSession(options);

  if (!session) redirect("/login");
  else if (session.user.role === "ADMIN") redirect("/admin");

  const todos = await getTodos();
  const userTodos = todos.filter((todo) => todo.userId === session.user.id);
  const total = userTodos.length;
  const done = userTodos.filter((t) => t.done).length;

  return (
    <main className="mx-auto w-full max-w-page flex-1 px-gutter py-6 tablet:px-gutter-tablet tablet:py-10">
      <Greeting name={session.user.name ?? ""} />

      <div className="grid gap-6 desktop:grid-cols-[1fr_20rem] desktop:items-start">
        <div className="flex flex-col gap-6">
          <Stats total={total} active={total - done} done={done} />
          <AddTodoForm />
          <TodoList todos={userTodos} />
        </div>

        <aside className="flex flex-col gap-6">
          <ProgressCard total={total} done={done} />
          <RoleCard role={session.user.role} />
        </aside>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <>
      <Header />

      <Suspense fallback={<HomeSkeleton />}>
        <GetUser />
      </Suspense>
    </>
  );
}
