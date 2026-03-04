import { IRepositoryFactory } from "../repositories";
import { CreateInitialUserUseCase } from "../use-cases/user/create-initial-user";

export class UsersUseCaseFactory {
    constructor(private repositoryFactory: IRepositoryFactory) {}

    createInitialUserUseCase(): CreateInitialUserUseCase {
        return new CreateInitialUserUseCase({ repositoryFactory: this.repositoryFactory });
    }
}
