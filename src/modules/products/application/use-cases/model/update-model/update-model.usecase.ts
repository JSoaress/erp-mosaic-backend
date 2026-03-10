import { Model } from "@/modules/products/domain/entities/model";
import { UpdateUseCase } from "@/shared/application";

import { IRepositoryFactory } from "../../../repositories";
import { UpdateModelUseCaseGateway, UpdateModelUseCaseInput, UpdateModelUseCaseOutput } from "./update-model.usecase.types";

export class UpdateModelUseCase extends UpdateUseCase<
    UpdateModelUseCaseInput,
    UpdateModelUseCaseOutput,
    IRepositoryFactory
> {
    constructor({ repositoryFactory, fkValidationService }: UpdateModelUseCaseGateway) {
        super({
            repositoryFactory,
            repo: "createModelRepository",
            entityName: Model.name,
            fkValidationService,
        });
    }

    protected filterBy({ id, brandId }: UpdateModelUseCaseInput): Record<string, unknown> {
        return { id, brandId };
    }
}
