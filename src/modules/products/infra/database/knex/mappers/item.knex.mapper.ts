import { Item } from "@/modules/products/domain/entities/product";
import { AbstractMapper, TableFilterConfig } from "@/shared/database";

import { KnexItemDTO } from "../models";

export class ItemKnexMapper extends AbstractMapper<Item, KnexItemDTO> {
    readonly config: TableFilterConfig<Item, KnexItemDTO> = {
        columns: {
            id: { columnName: "id", pk: true },
            name: { columnName: "name" },
            description: { columnName: "description" },
            brandId: { columnName: "brand_id" },
            status: { columnName: "status" },
        },
    };

    constructor() {
        super(Item.restore);
    }
}
