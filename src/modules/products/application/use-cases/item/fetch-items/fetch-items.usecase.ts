import { FetchUseCase } from "@/shared/application";

import { IRepositoryFactory } from "../../../repositories";
import { FetchItemsUseCaseGateway, FetchItemsUseCaseInput, FetchItemsUseCaseOutput } from "./fetch-items.usecase.types";

export class FetchItemsUseCase extends FetchUseCase<FetchItemsUseCaseInput, FetchItemsUseCaseOutput, IRepositoryFactory> {
    constructor({ repositoryFactory }: FetchItemsUseCaseGateway) {
        super({
            repositoryFactory,
            repo: "createItemRepository",
        });
    }
}
