import { IProductsContract } from "@/core/contracts";
import { ForeignKeyValidationService } from "@/shared/application/services";

import { IRepositoryFactory } from "../repositories";
import { AddOrderItemUseCase } from "../use-cases/order/add-order-item";
import { FetchOrdersUseCase } from "../use-cases/order/fetch-orders";
import { OpenOrderUseCase } from "../use-cases/order/open-order";
import { CreateTableUseCase, DeleteTableUseCase, FetchTablesUseCase, UpdateTableUseCase } from "../use-cases/table";

export class RestaurantUseCaseFactory {
    constructor(
        private repositoryFactory: IRepositoryFactory,
        private fkValidationService: ForeignKeyValidationService,
        private productsContract: IProductsContract,
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

    fetchOrdersUseCase(): FetchOrdersUseCase {
        return new FetchOrdersUseCase({ repositoryFactory: this.repositoryFactory });
    }

    openOrderUseCase(): OpenOrderUseCase {
        return new OpenOrderUseCase({ repositoryFactory: this.repositoryFactory });
    }

    addOrderItemUseCase(): AddOrderItemUseCase {
        return new AddOrderItemUseCase({
            repositoryFactory: this.repositoryFactory,
            productsContract: this.productsContract,
        });
    }
}
