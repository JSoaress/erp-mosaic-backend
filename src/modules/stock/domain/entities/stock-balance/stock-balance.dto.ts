import { EntityProps, Quantity } from "@/shared/domain";
import { foreignKey, z } from "@/shared/infra/libs/zod";

export const StockBalanceSchema = z.object({
    stockItemId: foreignKey("StockItem"),
    locationId: foreignKey("Location"),
    date: z.coerce.date(),
    quantity: z.coerce.number().transform((e) => Quantity.create(e)),
});

type Schema = typeof StockBalanceSchema;

export type StockBalanceDTO = EntityProps &
    z.output<Schema> & {
        createdAt: Date;
        updatedAt: Nullable<Date>;
    };

export type CreateStockBalanceDTO = Omit<z.input<Schema>, "quantity"> & {
    quantity: number;
};
