import { FetchUseCase } from "@/shared/application";

import { IRepositoryFactory } from "../../../repositories";
import { FetchBrandsUseCaseGateway, FetchBrandsUseCaseInput, FetchBrandsUseCaseOutput } from "./fetch-brands.usecase.types";

export class FetchBrandsUseCase extends FetchUseCase<FetchBrandsUseCaseInput, FetchBrandsUseCaseOutput, IRepositoryFactory> {
    constructor({ repositoryFactory }: FetchBrandsUseCaseGateway) {
        super({
            repositoryFactory,
            repo: "createBrandRepository",
        });
    }
}
