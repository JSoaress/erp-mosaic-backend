import { MeasurementUnit } from "@/modules/products/domain/entities/measurement-unit";
import { CreateUseCase } from "@/shared/application";

import { IRepositoryFactory } from "../../../repositories";
import {
    CreateMeasurementUnitUseCaseInput,
    CreateMeasurementUnitUseCaseOutput,
    CreateMeasurementUnitUseCaseGateway,
} from "./create-measurement-unit.usecase.types";

export class CreateMeasurementUnitUseCase extends CreateUseCase<
    CreateMeasurementUnitUseCaseInput,
    CreateMeasurementUnitUseCaseOutput,
    IRepositoryFactory
> {
    constructor({ repositoryFactory }: CreateMeasurementUnitUseCaseGateway) {
        super({
            repositoryFactory,
            repo: "createMeasurementUnitRepository",
            createEntityFn: MeasurementUnit.create,
        });
    }
}
