import { Either } from "ts-arch-kit/dist/core/helpers";

import { CreateMeasurementUnitDTO, MeasurementUnit } from "@/modules/stock/domain/entities/measurement-unit";
import { CreateUseCaseInput } from "@/shared/application";
import { ValidationError } from "@/shared/errors";

import { IRepositoryFactory } from "../../../repositories";

export type CreateMeasurementUnitUseCaseGateway = {
    repositoryFactory: IRepositoryFactory;
};

export type CreateMeasurementUnitUseCaseInput = CreateMeasurementUnitDTO & CreateUseCaseInput;

export type CreateMeasurementUnitUseCaseOutput = Either<ValidationError, MeasurementUnit>;
