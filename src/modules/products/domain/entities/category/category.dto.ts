import { EntityProps } from "@/shared/domain";
import { foreignKey, z } from "@/shared/infra/libs/zod";

import { Category } from "./category.entity";

export const CategorySchema = z.object({
    name: z.string().min(1),
    type: z.enum(["title", "category"]),
    parentId: foreignKey("Category").nullish().default(null),
});

export const UpdateCategorySchema = CategorySchema.omit({ type: true }).partial();

type Schema = typeof CategorySchema;

export type CategoryDTO = EntityProps & z.output<Schema>;

export type CreateCategoryDTO = Omit<z.input<Schema>, "parentId"> & {
    parent?: Nullable<Category>;
};

export type UpdateCategoryDTO = Omit<z.input<typeof UpdateCategorySchema>, "parentId"> & {
    parent?: Nullable<Category>;
};
