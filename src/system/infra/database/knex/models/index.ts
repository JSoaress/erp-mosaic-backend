import { KnexModel } from "@/shared/infra/database/knex/models";

export type KnexSubscriberDTO = KnexModel & {
    name: string;
    document: string;
    started_at: Date;
    end_at: Nullable<Date>;
    is_active: boolean;
};
