import { parseNumber } from "ts-arch-kit/dist/core/helpers";

import { Sku } from "@/modules/products/domain/entities/product";
import { AbstractMapper, TableFilterConfig } from "@/shared/database";

import { KnexSkuDTO } from "../models";

export class SkuKnexMapper extends AbstractMapper<Sku, KnexSkuDTO> {
    readonly config: TableFilterConfig<Sku, KnexSkuDTO> = {
        columns: {
            id: { columnName: "id", pk: true },
            itemId: { columnName: "item_id" },
            code: { columnName: "code" },
            description: { columnName: "description" },
            shortDescription: { columnName: "short_description" },
            characteristics: { columnName: "characteristics" },
            grossWeight: { columnName: "gross_weight", toDomain: (e) => parseNumber(e.gross_weight) },
            netWeight: { columnName: "net_weight", toDomain: (e) => parseNumber(e.net_weight) },
            volumes: { columnName: "volumes" },
            modelId: { columnName: "model_id" },
            categoryId: { columnName: "category_id" },
            obs: { columnName: "obs" },
            active: { columnName: "active" },
        },
    };

    constructor() {
        super(Sku.restore);
    }
}
