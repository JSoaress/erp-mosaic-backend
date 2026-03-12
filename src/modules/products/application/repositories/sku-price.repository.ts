import { IRepository } from "@/shared/infra/database";

import { Sku } from "../../domain/entities/product";
import { SkuPrice, SkuPriceDTO } from "../../domain/entities/sku-price";

export type SkuPriceWhereRepository = Omit<SkuPriceDTO, "price"> & { price: number };

export interface ISkuPriceRepository extends IRepository<SkuPrice, SkuPriceWhereRepository> {
    clearPrimaryPriceBySku(sku: Sku): Promise<void>;
}
