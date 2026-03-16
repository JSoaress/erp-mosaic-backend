import { Either, left, right } from "ts-arch-kit/dist/core/helpers";

import { Entity } from "@/shared/domain";
import { ValidationError } from "@/shared/errors";
import { ZodValidator } from "@/shared/libs/zod";

import { CategoryDTO, CreateCategoryDTO, CategorySchema, UpdateCategoryDTO, UpdateCategorySchema } from "./category.dto";

export class Category extends Entity<CategoryDTO> {
    static create({ parent, ...input }: CreateCategoryDTO): Either<ValidationError, Category> {
        if (parent?.get("type") === "category")
            return left(
                new ValidationError(Category.name, {
                    parent: ['Categoria do tipo "category" não podem ter filhas.'],
                }),
            );
        const validDataOrError = ZodValidator.validate({ ...input, parentId: parent?.get("id") }, CategorySchema);
        if (!validDataOrError.success) return left(new ValidationError(Category.name, validDataOrError.errors));
        return right(new Category({ ...validDataOrError.data, id: 0 }));
    }

    static restore(input: CategoryDTO) {
        return new Category(input);
    }

    update({ parent, ...input }: UpdateCategoryDTO): Either<ValidationError, void> {
        if (parent?.get("type") === "category")
            return left(
                new ValidationError(Category.name, {
                    parent: ['Categoria do tipo "category" não podem ter filhas.'],
                }),
            );
        const validDataOrError = ZodValidator.validate({ ...input, parentId: parent?.get("id") }, UpdateCategorySchema);
        if (!validDataOrError.success) return left(new ValidationError(Category.name, validDataOrError.errors));
        this.updateProps(validDataOrError.data);
        return right(undefined);
    }

    getSchema() {
        return CategorySchema;
    }

    isTitle() {
        return this.get("type") === "title";
    }

    isCategory() {
        return this.get("type") === "category";
    }
}
