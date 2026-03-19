import { Router } from "express";

import { httpRouteResolvers } from "@/core/infra/http";

import { ProductsUseCaseFactory } from "../../application/factories";
import { EntityJsonPresenter } from "./presenters";

export function skusRouter(factory: ProductsUseCaseFactory): Router {
    const router = Router();

    const presenter = new EntityJsonPresenter();
    const { query, create, mutation, delete: del } = httpRouteResolvers;

    router.get("/", query(factory.fetchSkusUseCase(), { presenter }));
    router.post("/", create(factory.createSkuUseCase(), { presenter }));
    router.patch("/:sku", mutation(factory.updateSkuUseCase(), { presenter, map: { id: ["params", "sku"] } }));
    router.delete("/:sku", del(factory.deleteSkuUseCase(), { map: { id: ["params", "sku"] } }));

    return router;
}
