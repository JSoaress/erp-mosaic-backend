import { Brand } from "@/modules/inventory/domain/entities/brand";
import { CreateUseCase } from "@/shared/application";

import { IRepositoryFactory } from "../../../repositories";
import { CreateBrandUseCaseGateway, CreateBrandUseCaseInput, CreateBrandUseCaseOutput } from "./create-brand.usecase.types";

export class CreateBrandUseCase extends CreateUseCase<
    CreateBrandUseCaseInput,
    CreateBrandUseCaseOutput,
    IRepositoryFactory
> {
    constructor({ repositoryFactory }: CreateBrandUseCaseGateway) {
        super({
            repositoryFactory,
            repo: "createBrandRepository",
            createEntityFn: Brand.create,
        });
    }
}
