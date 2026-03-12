import { Either } from "ts-arch-kit/dist/core/helpers";

import { MeasurementUnit, UpdateMeasurementUnitDTO } from "@/modules/stock/domain/entities/measurement-unit";
import { UpdateUseCaseInput } from "@/shared/application";
import { NotFoundModelError, ValidationError } from "@/shared/errors";

import { IRepositoryFactory } from "../../../repositories";

export type UpdateMeasurementUnitUseCaseGateway = {
    repositoryFactory: IRepositoryFactory;
};

export type UpdateMeasurementUnitUseCaseInput = UpdateMeasurementUnitDTO & UpdateUseCaseInput;

export type UpdateMeasurementUnitUseCaseOutput = Either<NotFoundModelError | ValidationError, MeasurementUnit>;
