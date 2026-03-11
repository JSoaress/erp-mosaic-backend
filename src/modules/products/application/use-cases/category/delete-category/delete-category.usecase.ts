import { Category } from "@/modules/products/domain/entities/category";
import { DeleteUseCase } from "@/shared/application";

import { IRepositoryFactory } from "../../../repositories";
import {
    DeleteCategoryUseCaseGateway,
    DeleteCategoryUseCaseInput,
    DeleteCategoryUseCaseOutput,
} from "./delete-category.usecase.types";

export class DeleteCategoryUseCase extends DeleteUseCase<
    DeleteCategoryUseCaseInput,
    DeleteCategoryUseCaseOutput,
    IRepositoryFactory
> {
    constructor({ repositoryFactory }: DeleteCategoryUseCaseGateway) {
        super({
            repositoryFactory,
            repo: "createCategoryRepository",
            entityName: Category.name,
        });
    }
}
