import { copyFile, unlink } from "node:fs/promises";
import { BACKUP_FILE, TODOS_FILE } from "./fixtures";

export default async function globalTeardown() {
  await copyFile(BACKUP_FILE, TODOS_FILE);
  await unlink(BACKUP_FILE);
}
