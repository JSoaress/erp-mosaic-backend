import { KnexModel } from "@/shared/infra/database/knex/models";

export type KnexBrandDTO = KnexModel & {
    name: string;
};

export type KnexModelDTO = KnexModel & {
    name: string;
    brand_id: number;
};

export type KnexCategoryDTO = KnexModel & {
    name: string;
    type: string;
    parent_id: Nullable<number>;
};

export type KnexMeasurementUnitDTO = KnexModel & {
    name: string;
    initials: string;
};

export type KnexItemDTO = KnexModel & {
    name: string;
    description: Nullable<string>;
    brand_id: Nullable<number>;
    status: string;
};

export type KnexSkuDTO = KnexModel & {
    item_id: number;
    code: string;
    description: string;
    short_description: Nullable<string>;
    characteristics: Nullable<string>;
    gross_weight: number;
    net_weight: number;
    volumes: number;
    model_id: Nullable<number>;
    category_id: Nullable<number>;
    measurement_unit_id: number;
    obs: Nullable<string>;
    active: boolean;
};
