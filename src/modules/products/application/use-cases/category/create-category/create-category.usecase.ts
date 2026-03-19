import { left, right } from "ts-arch-kit/dist/core/helpers";

import { Category } from "@/modules/products/domain/entities/category";
import { UseCase } from "@/shared/application";
import { NotFoundModelError } from "@/shared/errors";

import {
    CreateCategoryUseCaseGateway,
    CreateCategoryUseCaseInput,
    CreateCategoryUseCaseOutput,
} from "./create-category.usecase.types";

export class CreateCategoryUseCase extends UseCase<CreateCategoryUseCaseInput, CreateCategoryUseCaseOutput> {
    constructor(private gateway: CreateCategoryUseCaseGateway) {
        super();
    }

    protected async impl({ parentId, ...input }: CreateCategoryUseCaseInput): Promise<CreateCategoryUseCaseOutput> {
        const { repositoryFactory } = this.gateway;
        const uow = repositoryFactory.createUnitOfWork();
        const categoryRepository = repositoryFactory.createCategoryRepository();
        uow.prepare(categoryRepository);
        return uow.execute<CreateCategoryUseCaseOutput>(async () => {
            const parent = parentId ? await categoryRepository.findById(parentId) : null;
            if (parentId && !parent) return left(new NotFoundModelError(Category.name, parentId));
            const categoryOrError = Category.create({ parent, ...input });
            if (categoryOrError.isLeft()) return left(categoryOrError.value);
            const newCategory = categoryOrError.value;
            const createdCategory = await categoryRepository.save(newCategory);
            return right(createdCategory);
        });
    }
}
