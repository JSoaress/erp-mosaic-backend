import { left, right } from "ts-arch-kit/dist/core/helpers";

import { User } from "@/modules/users/domain/entities/user";
import { UseCase } from "@/shared/application";

import {
    CreateInitialUserUseCaseGateway,
    CreateInitialUserUseCaseInput,
    CreateInitialUserUseCaseOutput,
} from "./create-initial-user.usecase.types";

export class CreateInitialUserUseCase extends UseCase<CreateInitialUserUseCaseInput, CreateInitialUserUseCaseOutput> {
    constructor(private gateway: CreateInitialUserUseCaseGateway) {
        super();
    }

    protected async impl(input: CreateInitialUserUseCaseInput): Promise<CreateInitialUserUseCaseOutput> {
        const unitOfWork = this.gateway.repositoryFactory.createUnitOfWork();
        const userRepository = this.gateway.repositoryFactory.createUserRepository();
        unitOfWork.prepare(userRepository);
        return unitOfWork.execute<CreateInitialUserUseCaseOutput>(async () => {
            const userOrError = await User.create({ ...input, isAdmin: true });
            if (userOrError.isLeft()) return left(userOrError.value);
            const user = userOrError.value;
            const newUser = await userRepository.save(user);
            return right(newUser);
        });
    }
}
