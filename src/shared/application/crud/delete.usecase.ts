/* eslint-disable @typescript-eslint/no-explicit-any */
import { Either, left, right } from "ts-arch-kit/dist/core/helpers";
import { PrimaryKey } from "ts-arch-kit/dist/core/models";

import { IBaseRepositoryFactory, IRepository } from "@/shared/database";
import { MosaicError, NotFoundModelError } from "@/shared/errors";

import { UseCase, UseCaseInput } from "../usecase";

type DeleteUseCaseGateway<Repo extends IBaseRepositoryFactory> = {
    repositoryFactory: Repo;
    repo: keyof Omit<Repo, "createUnitOfWork">;
    entityName: string;
};

export type DeleteUseCaseInput = UseCaseInput & {
    id: PrimaryKey;
    [key: string]: any;
};

export type DeleteUseCaseOutput = Either<NotFoundModelError | MosaicError, void>;

export class DeleteUseCase<
    TInput extends DeleteUseCaseInput,
    TOutput extends DeleteUseCaseOutput,
    TRepositoryFactory extends IBaseRepositoryFactory,
> extends UseCase<TInput, TOutput> {
    constructor(protected gateway: DeleteUseCaseGateway<TRepositoryFactory>) {
        super();
    }

    protected async impl(input: TInput): Promise<TOutput> {
        const unitOfWork = this.gateway.repositoryFactory.createUnitOfWork(input.tenant);
        const repository = (this.gateway.repositoryFactory[this.gateway.repo] as any)() as IRepository<any>;
        unitOfWork.prepare(repository);
        return unitOfWork.execute<TOutput>(async () => {
            const filter = this.filterBy(input);
            const entity = await repository.findOne({ filter });
            if (!entity) return left(new NotFoundModelError(this.gateway.entityName, filter)) as TOutput;
            await repository.destroy(entity);
            return right(undefined) as TOutput;
        });
    }

    protected filterBy({ id }: TInput): Record<string, unknown> {
        return { id };
    }
}
