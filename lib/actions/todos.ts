"use server";

import options from "@/app/api/auth/[...nextauth]/option";
import { getTodos, saveTodos } from "@/lib/tasks";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export type ActionResult = { error: string } | { success: true };

export async function addTodo(title: string): Promise<ActionResult> {
  const session = await getServerSession(options);

  if (!session)
    return { error: "Your session has expired. Please log in again." };

  const cleanTitle = typeof title === "string" ? title.trim() : "";

  if (!cleanTitle)
    return { error: "Task can't be empty. Please type something first." };

  const newTodo: Todos = {
    id: crypto.randomUUID(),
    title: cleanTitle,
    done: false,
    userId: session.user.id,
    createdAt: new Date().toISOString(),
  };

  const todos = await getTodos();
  todos.push(newTodo);
  await saveTodos(todos);

  revalidatePath("/");
  revalidatePath("/admin");

  return { success: true };
}
