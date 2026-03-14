import { left, right } from "ts-arch-kit/dist/core/helpers";

import { UseCase } from "@/shared/application";
import { InvalidCredentialsError } from "@/shared/errors";

import {
    AuthenticateUserUseCaseGateway,
    AuthenticateUserUseCaseInput,
    AuthenticateUserUseCaseOutput,
} from "./authenticate-user.usecase.types";

export class AuthenticateUserUseCase extends UseCase<AuthenticateUserUseCaseInput, AuthenticateUserUseCaseOutput> {
    constructor(private gateway: AuthenticateUserUseCaseGateway) {
        super();
    }

    protected async impl({ tenant, ...input }: AuthenticateUserUseCaseInput): Promise<AuthenticateUserUseCaseOutput> {
        const unitOfWork = this.gateway.repositoryFactory.createUnitOfWork(tenant);
        const userRepository = this.gateway.repositoryFactory.createUserRepository();
        unitOfWork.prepare(userRepository);
        return unitOfWork.execute<AuthenticateUserUseCaseOutput>(async () => {
            const user = await userRepository.findOne({ filter: { email: input.email, status: "active" } });
            if (!user) return left(new InvalidCredentialsError());
            const matchPasswordOrError = await user.verifyPassword(input.password);
            console.log(matchPasswordOrError.value);
            if (matchPasswordOrError.isLeft()) return left(new InvalidCredentialsError());
            const jwt = this.gateway.jwtService.generate(user.get("email"), "aaaabbbbccc");
            return right({ jwt, refreshToken: "" });
        });
    }
}
