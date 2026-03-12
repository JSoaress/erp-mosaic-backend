import { Router } from "express";

import { ProductsUseCaseFactory } from "../../application/factories";
import { brandsAndModelsRouter } from "./brands-and-models.router";
import { categoriesRouter } from "./categories.router";
import { itemsRouter } from "./items.router";
import { measurementUnitsRouter } from "./measurement-units.router";
import { skuPricesRouter } from "./sku-prices.router";
import { skusRouter } from "./skus.router";

export function createRouter(useCaseFactory: ProductsUseCaseFactory): Router {
    const router = Router();

    router.use("/brands", brandsAndModelsRouter(useCaseFactory));
    router.use("/categories", categoriesRouter(useCaseFactory));
    router.use("/items", itemsRouter(useCaseFactory));
    router.use("/measurement-units", measurementUnitsRouter(useCaseFactory));
    router.use("/skus", skusRouter(useCaseFactory));
    router.use("/sku-prices", skuPricesRouter(useCaseFactory));

    return router;
}
