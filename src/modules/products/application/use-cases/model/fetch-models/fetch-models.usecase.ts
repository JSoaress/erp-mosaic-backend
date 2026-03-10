import { FetchUseCase } from "@/shared/application";

import { IRepositoryFactory } from "../../../repositories";
import { FetchModelsUseCaseGateway, FetchModelsUseCaseInput, FetchModelsUseCaseOutput } from "./fetch-models.usecase.types";

export class FetchModelsUseCase extends FetchUseCase<FetchModelsUseCaseInput, FetchModelsUseCaseOutput, IRepositoryFactory> {
    constructor({ repositoryFactory }: FetchModelsUseCaseGateway) {
        super({
            repositoryFactory,
            repo: "createModelRepository",
        });
    }
}
