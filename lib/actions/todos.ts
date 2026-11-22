"use server";

import options from "@/app/api/auth/[...nextauth]/option";
import { getTodos, saveTodos } from "@/lib/tasks";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { hasPermission } from "../permissions";

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

export async function deleteTodo(id: string): Promise<ActionResult> {
  const session = await getServerSession(options);

  if (!session)
    return { error: "Your session has expired. Please log in again." };

  const todos = await getTodos();
  const todo = todos.find((item) => item.id === id);

  if (!todo) {
    return { error: "Could not find task" };
  }

  const isOwner = todo.userId === session.user.id;
  const canDelete =
    hasPermission(session.user.role, "todo:delete:any") ||
    (isOwner && hasPermission(session.user.role, "todo:delete:own"));

  if (!canDelete)
    return { error: "You don't have permission to delete this task." };

  const findTodo = todos.findIndex((item) => item.id === todo.id);

  if (findTodo === -1) return { error: "Could not find task" };

  todos.splice(findTodo, 1);
  await saveTodos(todos);

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

export async function toggleDone(id: string): Promise<ActionResult> {
  const session = await getServerSession(options);

  if (!session)
    return { error: "Your session has expired. Please log in again." };

  const todos = await getTodos();
  const todo = todos.find((item) => item.id === id);

  if (!todo) {
    return { error: "Could not find task" };
  }

  const isOwner = todo.userId === session.user.id;
  const canUpdate =
    hasPermission(session.user.role, "todo:update:any") ||
    (isOwner && hasPermission(session.user.role, "todo:update:own"));

  if (!canUpdate)
    return { error: "You don't have permission to update this task." };

  todo.done = !todo.done;
  await saveTodos(todos);

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

export async function editTodo(
  id: string,
  title: string,
): Promise<ActionResult> {
  const session = await getServerSession(options);

  if (!session)
    return { error: "Your session has expired. Please log in again." };

  const cleanTitle = typeof title === "string" ? title.trim() : "";

  if (!cleanTitle)
    return { error: "Task can't be empty. Please type something first." };

  const todos = await getTodos();
  const todo = todos.find((item) => item.id === id);

  if (!todo) return { error: "Could not find task" };

  const isOwner = todo.userId === session.user.id;
  const canEdit =
    hasPermission(session.user.role, "todo:update:any") ||
    (isOwner && hasPermission(session.user.role, "todo:update:own"));

  if (!canEdit)
    return { error: "You don't have permission to edit this task." };

  todo.title = cleanTitle;
  await saveTodos(todos);

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}
