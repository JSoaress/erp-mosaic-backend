import { AbstractMapper, TableFilterConfig } from "@/shared/database";
import { Subscriber } from "@/platform/domain/entities/subscriber";

import { KnexSubscriberDTO } from "../models";

export class SubscriberKnexMapper extends AbstractMapper<Subscriber, KnexSubscriberDTO> {
    readonly config: TableFilterConfig<Subscriber, KnexSubscriberDTO> = {
        columns: {
            id: { columnName: "id", pk: true },
            name: { columnName: "name" },
            document: { columnName: "document" },
            startedAt: { columnName: "started_at" },
            endAt: { columnName: "end_at" },
            enabledModules: {
                columnName: "enabled_modules",
                toDomain: (p) => p.enabled_modules.split(","),
                toPersistence: (d) => d.get("enabledModules").join(","),
            },
            active: { columnName: "is_active" },
        },
    };

    constructor() {
        super(Subscriber.restore);
    }
}
