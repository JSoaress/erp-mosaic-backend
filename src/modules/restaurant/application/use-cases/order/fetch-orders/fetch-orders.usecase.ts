import { FetchUseCase } from "@/shared/application";

import { IRepositoryFactory } from "../../../repositories";
import { FetchOrdersUseCaseGateway, FetchOrdersUseCaseInput, FetchOrdersUseCaseOutput } from "./fetch-orders.usecase.types";

export class FetchOrdersUseCase extends FetchUseCase<FetchOrdersUseCaseInput, FetchOrdersUseCaseOutput, IRepositoryFactory> {
    constructor(gateway: FetchOrdersUseCaseGateway) {
        super({
            ...gateway,
            repo: "createOrderRepository",
        });
    }
}
