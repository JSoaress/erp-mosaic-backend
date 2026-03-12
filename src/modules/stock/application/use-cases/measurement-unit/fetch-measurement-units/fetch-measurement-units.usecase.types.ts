import { Either } from "ts-arch-kit/dist/core/helpers";
import { QueryOptions } from "ts-arch-kit/dist/database";

import { MeasurementUnit } from "@/modules/stock/domain/entities/measurement-unit";
import { FetchUseCaseInput } from "@/shared/application";
import { MosaicError } from "@/shared/errors";
import { Pagination } from "@/shared/helpers";

import { IRepositoryFactory, MeasurementUnitWhereRepository } from "../../../repositories";

export type FetchMeasurementUnitsUseCaseGateway = {
    repositoryFactory: IRepositoryFactory;
};

export type FetchMeasurementUnitsUseCaseInput = FetchUseCaseInput & {
    queryOptions?: QueryOptions<MeasurementUnitWhereRepository>;
};

export type FetchMeasurementUnitsUseCaseOutput = Either<MosaicError, Pagination<MeasurementUnit>>;
