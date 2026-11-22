type Role = "ADMIN" | "USER";

interface AllUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
}

interface Todos {
  id: string;
  title: string;
  done: boolean;
  userId: string;
  createdAt: string;
}
