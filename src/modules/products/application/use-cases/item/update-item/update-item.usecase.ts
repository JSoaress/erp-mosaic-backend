import { Item } from "@/modules/products/domain/entities/product";
import { UpdateUseCase } from "@/shared/application";

import { IRepositoryFactory } from "../../../repositories";
import { UpdateItemUseCaseGateway, UpdateItemUseCaseInput, UpdateItemUseCaseOutput } from "./update-item.usecase.types";

export class UpdateItemUseCase extends UpdateUseCase<UpdateItemUseCaseInput, UpdateItemUseCaseOutput, IRepositoryFactory> {
    constructor(gateway: UpdateItemUseCaseGateway) {
        super({
            ...gateway,
            repo: "createItemRepository",
            entityName: Item.name,
        });
    }
}
