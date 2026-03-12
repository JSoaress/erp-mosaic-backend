import { MeasurementUnit } from "@/modules/stock/domain/entities/measurement-unit";
import { UpdateUseCase } from "@/shared/application";

import { IRepositoryFactory } from "../../../repositories";
import {
    UpdateMeasurementUnitUseCaseInput,
    UpdateMeasurementUnitUseCaseOutput,
    UpdateMeasurementUnitUseCaseGateway,
} from "./update-measument-unit.usecase.types";

export class UpdateMeasurementUnitUseCase extends UpdateUseCase<
    UpdateMeasurementUnitUseCaseInput,
    UpdateMeasurementUnitUseCaseOutput,
    IRepositoryFactory
> {
    constructor({ repositoryFactory }: UpdateMeasurementUnitUseCaseGateway) {
        super({
            repositoryFactory,
            repo: "createMeasurementUnitRepository",
            entityName: MeasurementUnit.name,
        });
    }
}
