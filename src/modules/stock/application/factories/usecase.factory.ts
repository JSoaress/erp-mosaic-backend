import { ForeignKeyValidationService } from "@/shared/application/services";

import { IRepositoryFactory } from "../repositories";
import { CreateMeasurementUnitUseCase } from "../use-cases/measurement-unit/create-measurement-unit";
import { DeleteMeasurementUnitUseCase } from "../use-cases/measurement-unit/delete-measurement-unit";
import { FetchMeasurementUnitsUseCase } from "../use-cases/measurement-unit/fetch-measurement-units";
import { UpdateMeasurementUnitUseCase } from "../use-cases/measurement-unit/update-measument-unit";

export class StockUseCaseFactory {
    constructor(
        private repositoryFactory: IRepositoryFactory,
        private fkValidationService: ForeignKeyValidationService,
    ) {}

    fetchMeasurementUnitsUseCase(): FetchMeasurementUnitsUseCase {
        return new FetchMeasurementUnitsUseCase({ repositoryFactory: this.repositoryFactory });
    }

    createMeasurementUnitUseCase(): CreateMeasurementUnitUseCase {
        return new CreateMeasurementUnitUseCase({ repositoryFactory: this.repositoryFactory });
    }

    updateMeasurementUnitUseCase(): UpdateMeasurementUnitUseCase {
        return new UpdateMeasurementUnitUseCase({ repositoryFactory: this.repositoryFactory });
    }

    deleteMeasurementUnitUseCase(): DeleteMeasurementUnitUseCase {
        return new DeleteMeasurementUnitUseCase({ repositoryFactory: this.repositoryFactory });
    }
}
