import { Router } from "express";

import { ProductsUseCaseFactory } from "../../application/factories";
import { brandsAndModelsRouter } from "./brands-and-models.router";
import { categoriesRouter } from "./categories.router";

export function createRouter(useCaseFactory: ProductsUseCaseFactory): Router {
    const router = Router();

    router.use("/brands", brandsAndModelsRouter(useCaseFactory));
    router.use("/categories", categoriesRouter(useCaseFactory));

    return router;
}
