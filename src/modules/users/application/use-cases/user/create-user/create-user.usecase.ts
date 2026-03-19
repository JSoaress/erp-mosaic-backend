import { left, right } from "ts-arch-kit/dist/core/helpers";

import { User } from "@/modules/users/domain/entities/user";
import { UseCase } from "@/shared/application";
import { EmailTakenError } from "@/shared/errors";

import { CreateUserUseCaseGateway, CreateUserUseCaseInput, CreateUserUseCaseOutput } from "./create-user.usecase.types";

export class CreateUserUseCase extends UseCase<CreateUserUseCaseInput, CreateUserUseCaseOutput> {
    constructor(private gateway: CreateUserUseCaseGateway) {
        super();
    }

    protected async impl(input: CreateUserUseCaseInput): Promise<CreateUserUseCaseOutput> {
        const unitOfWork = this.gateway.repositoryFactory.createUnitOfWork();
        const userRepository = this.gateway.repositoryFactory.createUserRepository();
        unitOfWork.prepare(userRepository);
        return unitOfWork.execute<CreateUserUseCaseOutput>(async () => {
            const userOrError = await User.create(input);
            if (userOrError.isLeft()) return left(userOrError.value);
            const user = userOrError.value;
            const emailAlreadyInUse = await userRepository.exists({ email: user.get("email") });
            if (emailAlreadyInUse) return left(new EmailTakenError(user.get("email")));
            const newUser = await userRepository.save(user);
            return right(newUser);
        });
    }
}
