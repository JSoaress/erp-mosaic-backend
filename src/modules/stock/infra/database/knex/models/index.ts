import { KnexModel } from "@/shared/infra/database/knex/models";

export type KnexMeasurementUnitDTO = KnexModel & {
    name: string;
    initials: string;
};
