import { ICache, IJwt } from "@/shared/application/adapters";

import { IRepositoryFactory } from "../repositories";
import { AuthenticateUserUseCase } from "../use-cases/auth/authenticate-user";
import { CheckAuthenticatedUserUseCase } from "../use-cases/auth/check-authenticated-user";
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

    checkAuthenticatedUserUseCase(): CheckAuthenticatedUserUseCase {
        return new CheckAuthenticatedUserUseCase({
            repositoryFactory: this.repositoryFactory,
            jwtService: this.jwtService,
            cache: this.cache,
        });
    }
}
