import { Model } from "@/modules/products/domain/entities/model";
import { DeleteUseCase } from "@/shared/application";

import { IRepositoryFactory } from "../../../repositories";
import { DeleteModelUseCaseGateway, DeleteModelUseCaseInput, DeleteModelUseCaseOutput } from "./delete-model.usecase.types";

export class DeleteModelUseCase extends DeleteUseCase<
    DeleteModelUseCaseInput,
    DeleteModelUseCaseOutput,
    IRepositoryFactory
> {
    constructor({ repositoryFactory }: DeleteModelUseCaseGateway) {
        super({
            repositoryFactory,
            repo: "createModelRepository",
            entityName: Model.name,
        });
    }

    protected filterBy({ id, brandId }: DeleteModelUseCaseInput): Record<string, unknown> {
        return { id, brandId };
    }
}
