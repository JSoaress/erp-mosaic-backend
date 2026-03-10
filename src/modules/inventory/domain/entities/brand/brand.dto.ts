import { EntityProps } from "@/shared/domain";
import { z } from "@/shared/infra/libs/zod";

export const BrandSchema = z.object({
    name: z.string().min(1),
});

export const UpdateBrandSchema = BrandSchema.partial();

type Schema = typeof BrandSchema;

export type BrandDTO = EntityProps & z.output<Schema>;

export type CreateBrandDTO = z.input<Schema>;

export type UpdateBrandDTO = z.input<typeof UpdateBrandSchema>;
