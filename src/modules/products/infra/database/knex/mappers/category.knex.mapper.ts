import { Category } from "@/modules/products/domain/entities/category";
import { AbstractMapper, TableFilterConfig } from "@/shared/database";

import { KnexCategoryDTO } from "../models";

export class CategoryKnexMapper extends AbstractMapper<Category, KnexCategoryDTO> {
    readonly config: TableFilterConfig<Category, KnexCategoryDTO> = {
        columns: {
            id: { columnName: "id", pk: true },
            name: { columnName: "name" },
            type: { columnName: "type" },
            parentId: { columnName: "parent_id" },
        },
    };

    constructor() {
        super(Category.restore);
    }
}
