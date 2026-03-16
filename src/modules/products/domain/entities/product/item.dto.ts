import { EntityProps } from "@/shared/domain";
import { foreignKey, z } from "@/shared/libs/zod";

export const ItemSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1).nullish().default(null),
    brandId: foreignKey("Brand", true),
});

export const UpdateItemSchema = ItemSchema.partial();

export type ItemStatus = "pending" | "discontinued" | "active";

type Schema = typeof ItemSchema;

export type ItemDTO = EntityProps &
    z.output<Schema> & {
        status: ItemStatus;
    };

export type CreateItemDTO = z.input<Schema>;

export type UpdateItemDTO = z.input<typeof UpdateItemSchema>;
