import { IRepository } from "@/shared/database";

import { Sku, SkuDTO } from "../../domain/entities/product";

export type SkuWhereRepository = SkuDTO;

export type ISkuRepository = IRepository<Sku, SkuWhereRepository>;
