type Role = "ADMIN" | "USER";

interface AllUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
}
