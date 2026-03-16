/* eslint-disable @typescript-eslint/no-explicit-any */
import { Either, left, right } from "ts-arch-kit/dist/core/helpers";
import { UnitOfWork } from "ts-arch-kit/dist/database";

import { IBaseRepositoryFactory, IRepository } from "@/shared/database";
import { Entity } from "@/shared/domain";
import { MosaicError, NotFoundModelError, ValidationError } from "@/shared/errors";
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

export class CreateUseCase<
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
            const newEntity = entityOrError.value;
            const fkResult = await this.validateForeignKey(unitOfWork, newEntity);
            if (fkResult.isLeft()) return left(fkResult.value) as TOutput;
            const preSaveOrError = await this.preSave(newEntity, unitOfWork, repository);
            if (preSaveOrError.isLeft()) return left(preSaveOrError.value) as TOutput;
            const savedEntity = await repository.save(newEntity);
            await this.posSave(savedEntity, unitOfWork, repository);
            return right(savedEntity) as TOutput;
        });
    }

    protected async validateForeignKey(uow: UnitOfWork, entity: Entity<any>): Promise<Either<NotFoundModelError, void>> {
        if (!this.gateway.fkValidationService) return right(undefined);
        return this.gateway.fkValidationService.validate(uow, this.gateway.repositoryFactory, entity);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected async preSave(validatedEntity: any, uow: UnitOfWork, repository: IRepository<any>): Promise<TOutput> {
        return right(validatedEntity) as TOutput;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected async posSave(savedEntity: any, uow: UnitOfWork, repository: IRepository<any>): Promise<void> {
        // empty
    }
}
