import { FetchUseCase } from "@/shared/application";

import { IRepositoryFactory } from "../../../repositories";
import {
    FetchCategoriesUseCaseGateway,
    FetchCategoriesUseCaseInput,
    FetchCategoriesUseCaseOutput,
} from "./fetch-categories.usecase.types";

export class FetchCategoriesUseCase extends FetchUseCase<
    FetchCategoriesUseCaseInput,
    FetchCategoriesUseCaseOutput,
    IRepositoryFactory
> {
    constructor({ repositoryFactory }: FetchCategoriesUseCaseGateway) {
        super({
            repositoryFactory,
            repo: "createCategoryRepository",
        });
    }
}
