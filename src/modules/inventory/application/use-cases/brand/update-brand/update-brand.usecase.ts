import { Brand } from "@/modules/inventory/domain/entities/brand";
import { UpdateUseCase } from "@/shared/application";

import { IRepositoryFactory } from "../../../repositories";
import { UpdateBrandUseCaseGateway, UpdateBrandUseCaseInput, UpdateBrandUseCaseOutput } from "./update-brand.usecase.types";

export class UpdateBrandUseCase extends UpdateUseCase<
    UpdateBrandUseCaseInput,
    UpdateBrandUseCaseOutput,
    IRepositoryFactory
> {
    constructor({ repositoryFactory }: UpdateBrandUseCaseGateway) {
        super({
            repositoryFactory,
            repo: "createBrandRepository",
            entityName: Brand.name,
        });
    }
}
