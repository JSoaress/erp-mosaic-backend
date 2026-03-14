import { ForeignKeyValidationService } from "@/shared/application/services";

import { IRepositoryFactory } from "../repositories";
import { OpenOrderUseCase } from "../use-cases/order/open-order";
import { CreateTableUseCase, DeleteTableUseCase, FetchTablesUseCase, UpdateTableUseCase } from "../use-cases/table";

export class RestaurantUseCaseFactory {
    constructor(
        private repositoryFactory: IRepositoryFactory,
        private fkValidationService: ForeignKeyValidationService,
    ) {}

    fetchTablesUseCase() {
        return FetchTablesUseCase({ repositoryFactory: this.repositoryFactory });
    }

    createTableUseCase() {
        return CreateTableUseCase({ repositoryFactory: this.repositoryFactory });
    }

    updateTableUseCase() {
        return UpdateTableUseCase({ repositoryFactory: this.repositoryFactory });
    }

    deleteTableUseCase() {
        return DeleteTableUseCase({ repositoryFactory: this.repositoryFactory });
    }

    openOrderUseCase(): OpenOrderUseCase {
        return new OpenOrderUseCase({ repositoryFactory: this.repositoryFactory });
    }
}
