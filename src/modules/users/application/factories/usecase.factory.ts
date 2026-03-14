import { ICache, IJwt } from "@/shared/application/adapters";

import { IRepositoryFactory } from "../repositories";
import { AuthenticateUserUseCase } from "../use-cases/auth/authenticate-user";
import { CreateInitialUserUseCase } from "../use-cases/user/create-initial-user";

export class UsersUseCaseFactory {
    constructor(
        private repositoryFactory: IRepositoryFactory,
        private jwtService: IJwt,
        private cache: ICache,
    ) {}

    createInitialUserUseCase(): CreateInitialUserUseCase {
        return new CreateInitialUserUseCase({ repositoryFactory: this.repositoryFactory });
    }

    authenticateUserUseCase(): AuthenticateUserUseCase {
        return new AuthenticateUserUseCase({ repositoryFactory: this.repositoryFactory, jwtService: this.jwtService });
    }

}
