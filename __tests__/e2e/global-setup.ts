import { copyFile } from "node:fs/promises";
import { BACKUP_FILE, resetData, TODOS_FILE } from "./fixtures";

export default async function globalSetup() {
  await copyFile(TODOS_FILE, BACKUP_FILE);
  await resetData();
}
