import { IProductsContract } from "@/core/contracts";
import { ResourceRegistry } from "@/core/module";
import { ForeignKeyValidationService } from "@/shared/application/services";

import { IRepositoryFactory } from "../repositories";
import { AddOrderItemUseCase } from "../use-cases/order/add-order-item";
import { CancelOrderItemUseCase } from "../use-cases/order/cancel-order-item";
import { FetchOrdersUseCase } from "../use-cases/order/fetch-orders";
import { OpenOrderUseCase } from "../use-cases/order/open-order";
import { CreateTableUseCase, DeleteTableUseCase, FetchTablesUseCase, UpdateTableUseCase } from "../use-cases/table";

export class RestaurantUseCaseFactory {
    private fkValidationService: ForeignKeyValidationService;
    private productsContract: IProductsContract;

    constructor(
        private repositoryFactory: IRepositoryFactory,
        resourceRegistry: ResourceRegistry,
    ) {
        this.fkValidationService = resourceRegistry.get("fkValidationService");
        this.productsContract = resourceRegistry.get("contractsRegistry").resolve<IProductsContract>("products");
    }

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

    cancelOrderItemUseCase(): CancelOrderItemUseCase {
        return new CancelOrderItemUseCase({ repositoryFactory: this.repositoryFactory });
    }
}
