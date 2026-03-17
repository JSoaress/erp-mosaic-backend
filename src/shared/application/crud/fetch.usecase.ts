/* eslint-disable @typescript-eslint/no-explicit-any */
import { Either, right } from "ts-arch-kit/dist/core/helpers";
import { QueryOptions } from "ts-arch-kit/dist/database";

import { IBaseRepositoryFactory, IRepository } from "@/shared/database";
import { MosaicError } from "@/shared/errors";
import { Pagination } from "@/shared/helpers";

import { UseCase, UseCaseInput } from "../usecase";

type FetchUseCaseGateway<Repo extends IBaseRepositoryFactory> = {
    repositoryFactory: Repo;
    repo: keyof Omit<Repo, "createUnitOfWork">;
};

export type FetchUseCaseInput = UseCaseInput & {
    queryOptions?: QueryOptions;
};

export type FetchUseCaseOutput = Either<MosaicError, Pagination<any>>;

export class FetchUseCase<
    TInput extends FetchUseCaseInput,
    TOutput extends FetchUseCaseOutput,
    TRepositoryFactory extends IBaseRepositoryFactory,
> extends UseCase<TInput, TOutput> {
    constructor(protected gateway: FetchUseCaseGateway<TRepositoryFactory>) {
        super();
    }

    protected async impl({ queryOptions, tenant }: TInput): Promise<TOutput> {
        const unitOfWork = this.gateway.repositoryFactory.createUnitOfWork(tenant);
        const repository = (this.gateway.repositoryFactory[this.gateway.repo] as any)() as IRepository<any>;
        unitOfWork.prepare(repository);
        return unitOfWork.execute<TOutput>(async () => {
            const count = await repository.count(queryOptions?.filter);
            const results = await repository.find(queryOptions);
            return right(new Pagination(count, results)) as TOutput;
        });
    }
}
