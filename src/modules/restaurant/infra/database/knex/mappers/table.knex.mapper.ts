import { Table } from "@/modules/restaurant/domain/entities/table";
import { AbstractMapper, TableFilterConfig } from "@/shared/database";

import { KnexTableDTO } from "../models";

export class TableKnexMapper extends AbstractMapper<Table, KnexTableDTO> {
    readonly config: TableFilterConfig<Table, KnexTableDTO> = {
        columns: {
            id: { columnName: "id", pk: true },
            name: { columnName: "name" },
            number: { columnName: "number" },
            seats: { columnName: "seats" },
            status: { columnName: "status" },
            active: { columnName: "active" },
        },
    };

    constructor() {
        super(Table.restore);
    }
}
