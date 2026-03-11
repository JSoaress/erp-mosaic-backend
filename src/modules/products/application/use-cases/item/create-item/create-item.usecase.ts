import { Item } from "@/modules/products/domain/entities/product";
import { CreateUseCase } from "@/shared/application";

import { IRepositoryFactory } from "../../../repositories";
import { CreateItemUseCaseGateway, CreateItemUseCaseInput, CreateItemUseCaseOutput } from "./create-item.usecase.types";

export class CreateItemUseCase extends CreateUseCase<CreateItemUseCaseInput, CreateItemUseCaseOutput, IRepositoryFactory> {
    constructor({ repositoryFactory, fkValidationService }: CreateItemUseCaseGateway) {
        super({
            repositoryFactory,
            repo: "createItemRepository",
            createEntityFn: Item.create,
            fkValidationService,
        });
    }
}
