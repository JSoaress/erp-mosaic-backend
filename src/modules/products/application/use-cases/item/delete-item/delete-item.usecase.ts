import { Item } from "@/modules/products/domain/entities/product";
import { DeleteUseCase } from "@/shared/application";

import { IRepositoryFactory } from "../../../repositories";
import { DeleteItemUseCaseGateway, DeleteItemUseCaseInput, DeleteItemUseCaseOutput } from "./delete-item.usecase.types";

export class DeleteItemUseCase extends DeleteUseCase<DeleteItemUseCaseInput, DeleteItemUseCaseOutput, IRepositoryFactory> {
    constructor(gateway: DeleteItemUseCaseGateway) {
        super({
            ...gateway,
            repo: "createItemRepository",
            entityName: Item.name,
        });
    }
}
