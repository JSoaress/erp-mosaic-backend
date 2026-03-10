import { Router } from "express";

import { ProductsUseCaseFactory } from "../../application/factories";
import { brandsAndModelsRouter } from "./brands-and-models.router";

export function createRouter(useCaseFactory: ProductsUseCaseFactory): Router {
    const router = Router();

    brandsAndModelsRouter(router, useCaseFactory);

    return router;
}
