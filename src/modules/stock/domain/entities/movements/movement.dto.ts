import { EntityProps, Quantity } from "@/shared/domain";
import { foreignKey, ForeignKeySchema, z } from "@/shared/infra/libs/zod";

export const MovementSchema = z.object({
    stockItemId: foreignKey("StockItem"),
    type: z.enum(["in", "out", "adjustment", "sale", "purchase"]),
    date: z.coerce.date(),
    quantity: z.coerce.number().transform((e) => Quantity.create(e)),
    referenceType: z.string(),
    referenceId: ForeignKeySchema,
});

type Schema = typeof MovementSchema;

export type MovementDTO = EntityProps &
    z.output<Schema> & {
        createdAt: Date;
    };

export type CreateMovementDTO = Omit<z.input<Schema>, "quantity"> & {
    quantity: number;
};
