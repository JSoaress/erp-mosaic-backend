import { DeleteUseCaseInput, DeleteUseCaseOutput } from "@/shared/application";

import { IRepositoryFactory } from "../../../repositories";

export type DeleteMeasurementUnitUseCaseGateway = {
    repositoryFactory: IRepositoryFactory;
};

export type DeleteMeasurementUnitUseCaseInput = DeleteUseCaseInput;

export type DeleteMeasurementUnitUseCaseOutput = DeleteUseCaseOutput;
