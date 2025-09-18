export interface AuthUser {
  id: string;
  name: string;
  mobile: string;
  email: string;
  role: "admin" | "user";
}
