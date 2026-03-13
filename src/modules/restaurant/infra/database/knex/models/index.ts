import { KnexModel } from "@/shared/infra/database/knex/models";

export type KnexTableDTO = KnexModel & {
    name: string;
    number: number;
    seats: Nullable<number>;
    status: string;
    active: boolean;
};
