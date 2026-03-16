/* eslint-disable @typescript-eslint/no-explicit-any */
import { Either, left, right } from "ts-arch-kit/dist/core/helpers";
import { PrimaryKey } from "ts-arch-kit/dist/core/models";
import { UnitOfWork } from "ts-arch-kit/dist/database";

import { IBaseRepositoryFactory, IRepository } from "@/shared/database";
import { Entity } from "@/shared/domain";
import { MosaicError, NotFoundModelError, ValidationError } from "@/shared/errors";
import { Tenant } from "@/system/domain/entities/tenant";

import { ForeignKeyValidationService } from "../services";
import { UseCase } from "../usecase";

type UpdateUseCaseGateway<Repo extends IBaseRepositoryFactory> = {
    repositoryFactory: Repo;
    repo: keyof Omit<Repo, "createUnitOfWork">;
    entityName: string;
    fkValidationService?: ForeignKeyValidationService;
};

export type UpdateUseCaseInput = {
    id: PrimaryKey;
    tenant: Tenant;
    [key: string]: any;
};

export type UpdateUseCaseOutput = Either<NotFoundModelError | ValidationError | MosaicError, unknown>;

export class UpdateUseCase<
    TInput extends UpdateUseCaseInput,
    TOutput extends UpdateUseCaseOutput,
    TRepositoryFactory extends IBaseRepositoryFactory,
> extends UseCase<TInput, TOutput> {
    constructor(protected gateway: UpdateUseCaseGateway<TRepositoryFactory>) {
        super();
    }

    protected async impl(input: TInput): Promise<TOutput> {
        const { tenant, ...rest } = input;
        const unitOfWork = this.gateway.repositoryFactory.createUnitOfWork(tenant);
        const repository = (this.gateway.repositoryFactory[this.gateway.repo] as any)() as IRepository<Entity<any>>;
        unitOfWork.prepare(repository);
        return unitOfWork.execute<TOutput>(async () => {
            const filter = this.filterBy(input);
            const entity = await repository.findOne({ filter });
            if (!entity) return left(new NotFoundModelError(this.gateway.entityName, filter)) as TOutput;
            const updateOrError = entity.update(rest);
            if (updateOrError.isLeft()) return left(updateOrError.value) as TOutput;
            const fkResult = await this.validateForeignKey(unitOfWork, entity);
            if (fkResult.isLeft()) return left(fkResult.value) as TOutput;
            const preSaveOrError = await this.preSave(entity, unitOfWork, repository);
            if (preSaveOrError.isLeft()) return left(preSaveOrError.value) as TOutput;
            const updatedEntity = await repository.save(entity);
            await this.posSave(entity, unitOfWork, repository);
            return right(updatedEntity) as TOutput;
        });
    }

    protected filterBy({ id }: TInput): Record<string, unknown> {
        return { id };
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
