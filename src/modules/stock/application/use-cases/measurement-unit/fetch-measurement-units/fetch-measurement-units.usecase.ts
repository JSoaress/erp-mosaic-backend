import { FetchUseCase } from "@/shared/application";

import { IRepositoryFactory } from "../../../repositories";
import {
    FetchMeasurementUnitsUseCaseGateway,
    FetchMeasurementUnitsUseCaseInput,
    FetchMeasurementUnitsUseCaseOutput,
} from "./fetch-measurement-units.usecase.types";

export class FetchMeasurementUnitsUseCase extends FetchUseCase<
    FetchMeasurementUnitsUseCaseInput,
    FetchMeasurementUnitsUseCaseOutput,
    IRepositoryFactory
> {
    constructor({ repositoryFactory }: FetchMeasurementUnitsUseCaseGateway) {
        super({
            repositoryFactory,
            repo: "createMeasurementUnitRepository",
        });
    }
}
