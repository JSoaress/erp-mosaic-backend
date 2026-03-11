import { FetchUseCase } from "@/shared/application";

import { IRepositoryFactory } from "../../../repositories";
import { FetchSkusUseCaseGateway, FetchSkusUseCaseInput, FetchSkusUseCaseOutput } from "./fetch-skus.usecase.types";

export class FetchSkusUseCase extends FetchUseCase<FetchSkusUseCaseInput, FetchSkusUseCaseOutput, IRepositoryFactory> {
    constructor({ repositoryFactory }: FetchSkusUseCaseGateway) {
        super({
            repositoryFactory,
            repo: "createSkuRepository",
        });
    }
}
