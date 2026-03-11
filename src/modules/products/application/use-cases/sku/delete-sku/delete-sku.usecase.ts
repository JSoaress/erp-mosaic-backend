import { Sku } from "@/modules/products/domain/entities/product";
import { DeleteUseCase } from "@/shared/application";

import { IRepositoryFactory } from "../../../repositories";
import { DeleteSkuUseCaseGateway, DeleteSkuUseCaseInput, DeleteSkuUseCaseOutput } from "./delete-sku.usecase.types";

export class DeleteSkuUseCase extends DeleteUseCase<DeleteSkuUseCaseInput, DeleteSkuUseCaseOutput, IRepositoryFactory> {
    constructor({ repositoryFactory }: DeleteSkuUseCaseGateway) {
        super({
            repositoryFactory,
            repo: "createSkuRepository",
            entityName: Sku.name,
        });
    }
}
