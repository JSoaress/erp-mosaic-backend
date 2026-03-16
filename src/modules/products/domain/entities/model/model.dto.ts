import { EntityProps } from "@/shared/domain";
import { foreignKey, z } from "@/shared/libs/zod";

export const ModelSchema = z.object({
    name: z.string().min(1),
    brandId: foreignKey("Brand"),
});

export const UpdateModelSchema = ModelSchema.partial();

type Schema = typeof ModelSchema;

export type ModelDTO = EntityProps & z.output<Schema>;

export type CreateModelDTO = z.input<Schema>;

export type UpdateModelDTO = z.input<typeof UpdateModelSchema>;
