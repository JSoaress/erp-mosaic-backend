import { UserDTO } from "../user";

export type AuthenticatedUser = Pick<UserDTO, "id" | "name" | "email" | "status" | "isAdmin">;
