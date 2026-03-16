import { IRepository } from "@/shared/database";

import { User, UserDTO } from "../../domain/entities/user";

export type UserWhereRepository = Omit<UserDTO, "password">;

export type IUserRepository = Omit<IRepository<User, UserWhereRepository>, "destroy">;
