import { KnexModel } from "@/core/infra/database/knex/models";

export type KnexMeasurementUnitDTO = KnexModel & {
    name: string;
    initials: string;
};
