import { Brand } from "@/modules/products/domain/entities/brand";
import { AbstractMapper, TableFilterConfig } from "@/shared/infra/database";

import { KnexBrandDTO } from "../models";

export class BrandKnexMapper extends AbstractMapper<Brand, KnexBrandDTO> {
    readonly config: TableFilterConfig<Brand, KnexBrandDTO> = {
        columns: {
            id: { columnName: "id", pk: true },
            name: { columnName: "name" },
        },
    };

    constructor() {
        super(Brand.restore);
    }
}
