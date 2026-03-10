/* eslint-disable @typescript-eslint/no-explicit-any */
import { Either, left, right } from "ts-arch-kit/dist/core/helpers";
import { PrimaryKey } from "ts-arch-kit/dist/core/models";

import { MosaicError, NotFoundModelError } from "@/shared/errors";
import { IBaseRepositoryFactory, IRepository } from "@/shared/infra/database";
import { Tenant } from "@/system/domain/entities/tenant";

import { UseCase } from "../usecase";

type DeleteUseCaseGateway<Repo extends IBaseRepositoryFactory> = {
    repositoryFactory: Repo;
    repo: keyof Omit<Repo, "createUnitOfWork">;
    entityName: string;
};

export type DeleteUseCaseInput = {
    id: PrimaryKey;
    tenant: Tenant;
};

export type DeleteUseCaseOutput = Either<NotFoundModelError | MosaicError, void>;

export abstract class DeleteUseCase<
    TInput extends DeleteUseCaseInput,
    TOutput extends DeleteUseCaseOutput,
    TRepositoryFactory extends IBaseRepositoryFactory,
> extends UseCase<TInput, TOutput> {
    constructor(protected gateway: DeleteUseCaseGateway<TRepositoryFactory>) {
        super();
    }

    protected async impl({ id, tenant }: TInput): Promise<TOutput> {
        const unitOfWork = this.gateway.repositoryFactory.createUnitOfWork(tenant);
        const repository = (this.gateway.repositoryFactory[this.gateway.repo] as any)() as IRepository<any>;
        unitOfWork.prepare(repository);
        return unitOfWork.execute<TOutput>(async () => {
            const entity = await repository.findById(id);
            if (!entity) return left(new NotFoundModelError(this.gateway.entityName, id)) as TOutput;
            await repository.destroy(entity);
            return right(undefined) as TOutput;
        });
    }
}
