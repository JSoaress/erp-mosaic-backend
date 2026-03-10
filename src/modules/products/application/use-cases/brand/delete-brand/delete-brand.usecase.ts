import { Brand } from "@/modules/products/domain/entities/brand";
import { DeleteUseCase } from "@/shared/application";

import { IRepositoryFactory } from "../../../repositories";
import { DeleteBrandUseCaseGateway, DeleteBrandUseCaseInput, DeleteBrandUseCaseOutput } from "./delete-brand.usecase.types";

export class DeleteBrandUseCase extends DeleteUseCase<
    DeleteBrandUseCaseInput,
    DeleteBrandUseCaseOutput,
    IRepositoryFactory
> {
    constructor({ repositoryFactory }: DeleteBrandUseCaseGateway) {
        super({
            repositoryFactory,
            repo: "createBrandRepository",
            entityName: Brand.name,
        });
    }
}
