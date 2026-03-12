import { EntityProps } from "@/shared/domain";
import { foreignKey, z } from "@/shared/infra/libs/zod";

export const StockItemSchema = z.object({
    skuId: foreignKey("Sku"),
    measurementUnitId: foreignKey("MeasurementUnit"),
    trackInventory: z.coerce.boolean().default(true),
});

type Schema = typeof StockItemSchema;

export type StockItemDTO = EntityProps & z.output<Schema>;

export type CreateStockItemDTO = z.input<Schema>;
