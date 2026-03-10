import { Model } from "@/modules/inventory/domain/entities/model";
import { AbstractMapper, TableFilterConfig } from "@/shared/infra/database";

import { KnexModelDTO } from "../models";

export class ModelKnexMapper extends AbstractMapper<Model, KnexModelDTO> {
    readonly config: TableFilterConfig<Model, KnexModelDTO> = {
        columns: {
            id: { columnName: "id", pk: true },
            name: { columnName: "name" },
            brandId: { columnName: "brand_id" },
        },
    };

    constructor() {
        super(Model.restore);
    }
}
