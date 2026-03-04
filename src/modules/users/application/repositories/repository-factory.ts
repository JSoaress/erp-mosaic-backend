import { IBaseRepositoryFactory } from "@/shared/infra/database";

import { IUserRepository } from "./user.repository";

export interface IRepositoryFactory extends IBaseRepositoryFactory {
    createUserRepository(): IUserRepository;
}
