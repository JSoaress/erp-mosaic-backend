import { Model } from "@/modules/products/domain/entities/model";
import { CreateUseCase } from "@/shared/application";

import { IRepositoryFactory } from "../../../repositories";
import { CreateModelUseCaseGateway, CreateModelUseCaseInput, CreateModelUseCaseOutput } from "./create-model.usecase.types";

export class CreateModelUseCase extends CreateUseCase<
    CreateModelUseCaseInput,
    CreateModelUseCaseOutput,
    IRepositoryFactory
> {
    constructor({ repositoryFactory, fkValidationService }: CreateModelUseCaseGateway) {
        super({
            repositoryFactory,
            repo: "createModelRepository",
            createEntityFn: Model.create,
            fkValidationService,
        });
    }
}
