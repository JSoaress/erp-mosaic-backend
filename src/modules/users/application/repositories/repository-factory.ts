import { IBaseRepositoryFactory } from "@/shared/database";

import { IUserRepository } from "./user.repository";

export interface IRepositoryFactory extends IBaseRepositoryFactory {
    createUserRepository(): IUserRepository;
}
