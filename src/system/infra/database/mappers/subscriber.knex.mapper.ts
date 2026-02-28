import { AbstractMapper, TableFilterConfig } from "@/shared/infra/database";
import { Subscriber } from "@/system/domain/entities/subscriber";

import { KnexSubscriberDTO } from "../knex/models";

export class SubscriberKnexMapper extends AbstractMapper<Subscriber, KnexSubscriberDTO> {
    readonly config: TableFilterConfig<Subscriber, KnexSubscriberDTO> = {
        columns: {
            id: { columnName: "id", pk: true },
            name: { columnName: "name" },
            document: { columnName: "document" },
            startedAt: { columnName: "started_at" },
            endAt: { columnName: "end_at" },
            active: { columnName: "is_active" },
        },
    };

    constructor() {
        super(Subscriber.restore);
    }
}
