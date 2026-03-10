/* eslint-disable @typescript-eslint/no-explicit-any */
import { Either, left, right } from "ts-arch-kit/dist/core/helpers";
import { UnitOfWork } from "ts-arch-kit/dist/database";

import { Entity } from "@/shared/domain";
import { MosaicError, NotFoundModelError, ValidationError } from "@/shared/errors";
import { IBaseRepositoryFactory, IRepository } from "@/shared/infra/database";
import { Tenant } from "@/system/domain/entities/tenant";

import { ForeignKeyValidationService } from "../services";
import { UseCase } from "../usecase";

type CreateUseCaseGateway<Repo extends IBaseRepositoryFactory> = {
    repositoryFactory: Repo;
    repo: keyof Omit<Repo, "createUnitOfWork">;
    createEntityFn: (input: any) => Either<ValidationError, any>;
    fkValidationService?: ForeignKeyValidationService;
};

export type CreateUseCaseInput = {
    tenant: Tenant;
};

export abstract class CreateUseCase<
    TInput extends CreateUseCaseInput,
    TOutput extends Either<MosaicError, unknown>,
    TRepositoryFactory extends IBaseRepositoryFactory,
> extends UseCase<TInput, TOutput> {
    constructor(protected gateway: CreateUseCaseGateway<TRepositoryFactory>) {
        super();
    }

    protected async impl({ tenant, ...input }: TInput): Promise<TOutput> {
        const unitOfWork = this.gateway.repositoryFactory.createUnitOfWork(tenant);
        const repository = (this.gateway.repositoryFactory[this.gateway.repo] as any)() as IRepository<any>;
        unitOfWork.prepare(repository);
        return unitOfWork.execute<TOutput>(async () => {
            const entityOrError = this.gateway.createEntityFn(input);
            if (entityOrError.isLeft()) return left(entityOrError.value) as TOutput;
            const unsavedEntity = entityOrError.value;
            const fkResult = await this.validateForeignKey(unitOfWork, unsavedEntity);
            if (fkResult.isLeft()) return left(fkResult.value) as TOutput;
            const newEntity = await repository.save(unsavedEntity);
            return right(newEntity) as TOutput;
        });
    }

    protected async validateForeignKey(uow: UnitOfWork, entity: Entity<any>): Promise<Either<NotFoundModelError, void>> {
        if (!this.gateway.fkValidationService) return right(undefined);
        return this.gateway.fkValidationService.validate(uow, this.gateway.repositoryFactory, entity);
    }
}
