import { ISkuPriceRepository } from "@/modules/products/application/repositories";
import { Sku } from "@/modules/products/domain/entities/product";
import { SkuPrice } from "@/modules/products/domain/entities/sku-price";
import { DefaultKnexRepository } from "@/shared/infra/database/knex/repositories";

import { SkuPriceKnexMapper } from "../mappers";
import { KnexSkuPriceDTO } from "../models";

export class SkuPriceKnexRepository extends DefaultKnexRepository<SkuPrice, KnexSkuPriceDTO> implements ISkuPriceRepository {
    constructor() {
        super("products_sku_prices", new SkuPriceKnexMapper());
    }

    async clearPrimaryPriceBySku(sku: Sku): Promise<void> {
        const trx = this.getTransaction();
        await trx(this.tableName).update({ main: false }).where({ sku_id: sku.id });
    }
}
