import { KnexModel } from "@/shared/infra/database/knex/models";

export type KnexBrandDTO = KnexModel & {
    name: string;
};

export type KnexModelDTO = KnexModel & {
    name: string;
    brand_id: number;
};
