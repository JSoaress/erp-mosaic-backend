import { EntityProps } from "@/shared/domain";
import { foreignKey, z } from "@/shared/infra/libs/zod";

export const SkuSchema = z.object({
    itemId: foreignKey("Item"),
    code: z.string().min(1).max(20),
    description: z.string().min(1),
    shortDescription: z.string().min(1).max(40).nullish().default(null),
    characteristics: z.string().min(1).nullish().default(null),
    grossWeight: z.coerce.number().nonnegative().default(0),
    netWeight: z.coerce.number().nonnegative().default(0),
    volumes: z.coerce.number().int().default(0),
    modelId: foreignKey("Model").nullish().default(null),
    categoryId: foreignKey("Category").nullish().default(null),
    measurementUnitId: foreignKey("MeasurementUnit"),
    obs: z.string().min(1).nullish().default(null),
    active: z.coerce.boolean().default(true),
});

export const UpdateSkuSchema = SkuSchema.omit({ itemId: true, code: true }).partial();

type Schema = typeof SkuSchema;

export type SkuDTO = EntityProps & z.output<Schema>;

export type CreateSkuDTO = z.input<Schema>;

export type UpdateSkuDTO = z.input<typeof UpdateSkuSchema>;
