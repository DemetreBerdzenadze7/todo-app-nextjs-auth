import { writeFile, readFile } from "fs/promises";
import path from "path";

const pathFile = path.join(process.cwd(), "data", "todos.json");

export async function getTodos(): Promise<Todos[]> {
  const todos = await readFile(pathFile, "utf-8");
  return JSON.parse(todos);
}

export async function saveTodos(todo: Todos) {
  return await writeFile(pathFile, JSON.stringify(todo, null, 2));
}
