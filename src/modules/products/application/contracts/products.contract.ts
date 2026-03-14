import { Either, left, right } from "ts-arch-kit/dist/core/helpers";
import { PrimaryKey } from "ts-arch-kit/dist/core/models";

import { IProductsContract, SharedSkuPriceDTO } from "@/core/contracts";
import { NotFoundModelError } from "@/shared/errors";
import { Tenant } from "@/system/domain/entities/tenant";

import { SkuPrice } from "../../domain/entities/sku-price";
import { IRepositoryFactory } from "../repositories";

export class ProductsContract implements IProductsContract {
    constructor(private repositoryFactory: IRepositoryFactory) {}

    async getSkuPriceById(id: PrimaryKey, tenant: Tenant): Promise<Either<NotFoundModelError, SharedSkuPriceDTO>> {
        const unitOfWork = this.repositoryFactory.createUnitOfWork(tenant);
        const skuPriceRepository = this.repositoryFactory.createSkuPriceRepository();
        unitOfWork.prepare(skuPriceRepository);
        return unitOfWork.execute<Either<NotFoundModelError, SharedSkuPriceDTO>>(async () => {
            const skuPrice = await skuPriceRepository.findById(id);
            if (!skuPrice) return left(new NotFoundModelError(SkuPrice.name, id));
            return right(skuPrice.toDto());
        });
    }
}
