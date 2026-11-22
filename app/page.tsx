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

async function GetUser() {
  const session = await getServerSession();

  if (!session) redirect("/");
  else if (session.user.role === "ADMIN") redirect("/admin");

  const todos = await getTodos();
  const filteredTodos = todos.filter((todo) => todo.userId === session.user.id);
  const total = filteredTodos.length;
  const done = filteredTodos.filter((t) => t.done).length;

  return (
    <main className="mx-auto w-full max-w-page flex-1 px-gutter py-6 tablet:px-gutter-tablet tablet:py-10">
      <Greeting name="Giorgi" />

      <div className="grid gap-6 desktop:grid-cols-[1fr_20rem] desktop:items-start">
        <div className="flex flex-col gap-6">
          <Stats total={total} active={total - done} done={done} />
          <AddTodoForm />
          <TodoList todos={filteredTodos} />
        </div>

        <aside className="hidden flex-col gap-6 desktop:flex">
          <ProgressCard total={total} done={done} />
          <RoleCard />
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
