import { writeFile, readFile } from "fs/promises";
import path from "path";

const pathFile = path.join(process.cwd(), "data", "users.json");

export async function getUsers(): Promise<AllUser[]> {
  const users = await readFile(pathFile, "utf-8");
  return JSON.parse(users);
}

export async function saveUsers(user: AllUser) {
  return await writeFile(pathFile, JSON.stringify(user, null, 2));
}
