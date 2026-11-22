export type Permission =
  | "todo:create"
  | "todo:read:own"
  | "todo:update:own"
  | "todo:delete:own"
  | "todo:read:any"
  | "todo:update:any"
  | "todo:delete:any"
  | "user:read";

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  USER: ["todo:create", "todo:read:own", "todo:update:own", "todo:delete:own"],
  ADMIN: [
    "todo:create",
    "todo:read:own",
    "todo:update:own",
    "todo:delete:own",
    "todo:read:any",
    "todo:update:any",
    "todo:delete:any",
    "user:read",
  ],
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role].includes(permission);
}
