import { left, right } from "ts-arch-kit/dist/core/helpers";

import { AuthenticatedUser } from "@/modules/users/domain/entities/auth";
import { User } from "@/modules/users/domain/entities/user";
import { UseCase } from "@/shared/application";
import { NotFoundModelError } from "@/shared/errors";

import {
    CheckAuthenticatedUserUseCaseGateway,
    CheckAuthenticatedUserUseCaseInput,
    CheckAuthenticatedUserUseCaseOutput,
} from "./check-authenticated-user.usecase.types";

export class CheckAuthenticatedUserUseCase extends UseCase<
    CheckAuthenticatedUserUseCaseInput,
    CheckAuthenticatedUserUseCaseOutput
> {
    constructor(private gateway: CheckAuthenticatedUserUseCaseGateway) {
        super();
    }

    protected async impl(input: CheckAuthenticatedUserUseCaseInput): Promise<CheckAuthenticatedUserUseCaseOutput> {
        const unitOfWork = this.gateway.repositoryFactory.createUnitOfWork(input.tenant);
        const userRepository = this.gateway.repositoryFactory.createUserRepository();
        unitOfWork.prepare(userRepository);
        return unitOfWork.execute<CheckAuthenticatedUserUseCaseOutput>(async () => {
            const decryptedTokenOrError = this.gateway.jwtService.verify<string>(input.token, "aaaabbbbccc");
            if (decryptedTokenOrError.isLeft()) return left(decryptedTokenOrError.value);
            const { sub: email } = decryptedTokenOrError.value;
            const cacheKey = `${input.tenant.getName()}:authuser:${email}`;
            const cachedAuthenticatedUser = await this.gateway.cache.get<AuthenticatedUser>(cacheKey);
            if (cachedAuthenticatedUser) return right(cachedAuthenticatedUser);
            const user = await userRepository.findOne({ filter: { email } });
            if (!user) return left(new NotFoundModelError(User.name, { email }));
            const authenticatedUser: AuthenticatedUser = {
                id: user.getId(),
                name: user.get("name"),
                email: user.get("email"),
                status: user.get("status"),
                isAdmin: user.get("isAdmin"),
            };
            await this.gateway.cache.set(cacheKey, authenticatedUser, { ttl: 4 * 60 * 60 * 1000 });
            return right(authenticatedUser);
        });
    }
}
