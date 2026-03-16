import { MeasurementUnit } from "@/modules/stock/domain/entities/measurement-unit";
import { AbstractMapper, TableFilterConfig } from "@/shared/database";

import { KnexMeasurementUnitDTO } from "../models";

export class MeasurementUnitKnexMapper extends AbstractMapper<MeasurementUnit, KnexMeasurementUnitDTO> {
    readonly config: TableFilterConfig<MeasurementUnit, KnexMeasurementUnitDTO> = {
        columns: {
            id: { columnName: "id", pk: true },
            name: { columnName: "name" },
            initials: { columnName: "initials" },
        },
    };

    constructor() {
        super(MeasurementUnit.restore);
    }
}
