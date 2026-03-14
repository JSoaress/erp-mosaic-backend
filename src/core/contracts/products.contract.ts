import { Either } from "ts-arch-kit/dist/core/helpers";
import { PrimaryKey } from "ts-arch-kit/dist/core/models";

import { SkuPriceDTO } from "@/modules/products/domain/entities/sku-price";
import { NotFoundModelError } from "@/shared/errors";
import { Tenant } from "@/system/domain/entities/tenant";

export type SharedSkuPriceDTO = SkuPriceDTO;

export interface IProductsContract {
    getSkuPriceById(id: PrimaryKey, tenant: Tenant): Promise<Either<NotFoundModelError, SharedSkuPriceDTO>>;
}
