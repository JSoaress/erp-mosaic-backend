import { Router } from "express";

import { httpRouteResolvers } from "@/core/infra/http";

import { ProductsUseCaseFactory } from "../../application/factories";
import { SkuPriceJsonPresenter } from "./presenters";

export function skuPricesRouter(factory: ProductsUseCaseFactory): Router {
    const router = Router();

    const presenter = new SkuPriceJsonPresenter();
    const { query, create, mutation, delete: del } = httpRouteResolvers;

    router.get("/", query(factory.fetchSkuPricesUseCase(), { presenter }));
    router.post("/", create(factory.createSkuPriceUseCase(), { presenter }));
    router.patch("/:price", mutation(factory.updateSkuPriceUseCase(), { presenter, map: { id: ["params", "price"] } }));
    router.delete("/:price", del(factory.deleteSkuPriceUseCase(), { map: { id: ["params", "price"] } }));

    return router;
}
