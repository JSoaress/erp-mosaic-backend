/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPresenter } from "ts-arch-kit/dist/core/helpers";

import { SkuPrice, SkuPriceDTO } from "@/modules/products/domain/entities/sku-price";
import { Entity } from "@/shared/domain";

export class EntityJsonPresenter implements IPresenter<Entity<any>, Record<string, unknown>> {
    present(input: Entity<any>): Record<string, unknown> {
        return input.toDto();
    }
}

type SkuPriceJson = Omit<SkuPriceDTO, "price"> & {
    price: number;
};

export class SkuPriceJsonPresenter implements IPresenter<SkuPrice, SkuPriceJson> {
    present(input: SkuPrice): SkuPriceJson {
        return {
            id: input.id,
            skuId: input.get("skuId"),
            price: input.price,
            validFrom: input.get("validFrom"),
            validTo: input.get("validTo"),
            main: input.get("main"),
            active: input.get("main"),
        };
    }
}
