import { IRepository } from "@/shared/infra/database";

import { Sku, SkuDTO } from "../../domain/entities/product";

export type SkuWhereRepository = SkuDTO;

export type ISkuRepository = IRepository<Sku, SkuWhereRepository>;
