import { Either } from "ts-arch-kit/dist/core/helpers";
import { PrimaryKey } from "ts-arch-kit/dist/core/models";

import { SkuPriceDTO } from "@/modules/products/domain/entities/sku-price";
import { NotFoundModelError } from "@/shared/errors";

export type SharedSkuPriceDTO = SkuPriceDTO;

export interface IProductsContract {
    getSkuPriceById(id: PrimaryKey): Promise<Either<NotFoundModelError, SharedSkuPriceDTO>>;
}
