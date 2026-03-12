import { MeasurementUnit } from "@/modules/stock/domain/entities/measurement-unit";
import { DeleteUseCase } from "@/shared/application";

import { IRepositoryFactory } from "../../../repositories";
import {
    DeleteMeasurementUnitUseCaseInput,
    DeleteMeasurementUnitUseCaseOutput,
    DeleteMeasurementUnitUseCaseGateway,
} from "./delete-measurement-unit.usecase.types";

export class DeleteMeasurementUnitUseCase extends DeleteUseCase<
    DeleteMeasurementUnitUseCaseInput,
    DeleteMeasurementUnitUseCaseOutput,
    IRepositoryFactory
> {
    constructor({ repositoryFactory }: DeleteMeasurementUnitUseCaseGateway) {
        super({
            repositoryFactory,
            repo: "createMeasurementUnitRepository",
            entityName: MeasurementUnit.name,
        });
    }
}
