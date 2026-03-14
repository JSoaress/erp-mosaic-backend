import { SharedSkuPriceDTO } from "@/core/contracts";
import { EntityProps, Money, Quantity } from "@/shared/domain";
import { foreignKey, ForeignKeySchema, z } from "@/shared/infra/libs/zod";

import { Attendant } from "../attendant";

export const OrderItemSchema = z.object({
    item: z.coerce.number().int().positive(),
    orderId: ForeignKeySchema,
    skuId: foreignKey("sku"),
    quantity: z.coerce
        .number()
        .positive()
        .transform((e) => Quantity.create(e)),
    notes: z.string().min(1).nullish().default(null),
});

type Schema = typeof OrderItemSchema;

export type OrderItemDTO = EntityProps &
    z.output<Schema> & {
        unitPrice: Money;
        status: "delivered" | "cancelled";
        createdBy: number;
        createdAt: Date;
    };

export type CreateOrderItemDTO = Omit<z.input<Schema>, "skuId"> & {
    skuPrice: SharedSkuPriceDTO;
    attendant: Attendant;
};
