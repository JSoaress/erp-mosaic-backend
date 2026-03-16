import { SkuPrice } from "@/modules/products/domain/entities/sku-price";
import { Money } from "@/shared/domain";
import { AbstractMapper, TableFilterConfig } from "@/shared/database";

import { KnexSkuPriceDTO } from "../models";

export class SkuPriceKnexMapper extends AbstractMapper<SkuPrice, KnexSkuPriceDTO> {
    readonly config: TableFilterConfig<SkuPrice, KnexSkuPriceDTO> = {
        columns: {
            id: { columnName: "id", pk: true },
            skuId: { columnName: "sku_id" },
            price: { columnName: "price", toDomain: (p) => Money.fromCents(p.price), toPersistence: (d) => d.price },
            validFrom: { columnName: "valid_from" },
            validTo: { columnName: "valid_to" },
            main: { columnName: "main" },
            active: { columnName: "active" },
        },
    };

    constructor() {
        super(SkuPrice.restore);
    }
}
