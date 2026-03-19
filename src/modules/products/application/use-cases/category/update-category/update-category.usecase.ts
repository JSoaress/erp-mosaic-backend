import { left, right } from "ts-arch-kit/dist/core/helpers";

import { Category } from "@/modules/products/domain/entities/category";
import { UseCase } from "@/shared/application";
import { NotFoundModelError } from "@/shared/errors";

import {
    UpdateCategoryUseCaseGateway,
    UpdateCategoryUseCaseInput,
    UpdateCategoryUseCaseOutput,
} from "./update-category.usecase.types";

export class UpdateCategoryUseCase extends UseCase<UpdateCategoryUseCaseInput, UpdateCategoryUseCaseOutput> {
    constructor(private gateway: UpdateCategoryUseCaseGateway) {
        super();
    }

    protected async impl({ parentId, ...input }: UpdateCategoryUseCaseInput): Promise<UpdateCategoryUseCaseOutput> {
        const { repositoryFactory } = this.gateway;
        const uow = repositoryFactory.createUnitOfWork();
        const categoryRepository = repositoryFactory.createCategoryRepository();
        uow.prepare(categoryRepository);
        return uow.execute<UpdateCategoryUseCaseOutput>(async () => {
            const category = await categoryRepository.findById(input.id);
            if (!category) return left(new NotFoundModelError(Category.name, input.id));
            const parent = parentId ? await categoryRepository.findById(parentId) : null;
            if (parentId && !parent) return left(new NotFoundModelError(Category.name, parentId));
            const updateOrError = category.update({ parent, ...input });
            if (updateOrError.isLeft()) return left(updateOrError.value);
            const updatedCategory = await categoryRepository.save(category);
            return right(updatedCategory);
        });
    }
}
