import { Either } from "ts-arch-kit/dist/core/helpers";
import { QueryOptions } from "ts-arch-kit/dist/database";

import { CreateTableDTO, Table, UpdateTableDTO } from "@/modules/restaurant/domain/entities/table";
import {
    CreateUseCaseInput,
    DeleteUseCaseInput,
    DeleteUseCaseOutput,
    FetchUseCaseInput,
    UpdateUseCaseInput,
} from "@/shared/application";
import { MosaicError, TableIsNotCloseError, ValidationError } from "@/shared/errors";
import { Pagination } from "@/shared/helpers";

import { IRepositoryFactory, TableWhereRepository } from "../../repositories";

type BaseUseCaseGateway = {
    repositoryFactory: IRepositoryFactory;
};

export type CreateTableUseCaseGateway = BaseUseCaseGateway;

export type CreateTableUseCaseInput = CreateTableDTO & CreateUseCaseInput;

export type CreateTableUseCaseOutput = Either<ValidationError, Table>;

export type FetchTablesUseCaseGateway = BaseUseCaseGateway;

export type FetchTablesUseCaseInput = FetchUseCaseInput & {
    queryOptions?: QueryOptions<TableWhereRepository>;
};

export type FetchTablesUseCaseOutput = Either<MosaicError, Pagination<Table>>;

export type UpdateTableUseCaseGateway = BaseUseCaseGateway;

export type UpdateTableUseCaseInput = UpdateTableDTO & UpdateUseCaseInput;

export type UpdateTableUseCaseOutput = Either<ValidationError | TableIsNotCloseError, Table>;

export type DeleteTableUseCaseGateway = BaseUseCaseGateway;

export type DeleteTableUseCaseInput = DeleteUseCaseInput;

export type DeleteTableUseCaseOutput = DeleteUseCaseOutput;
