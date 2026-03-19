import { Router } from "express";

import { httpRouteResolvers } from "@/core/infra/http";

import { ProductsUseCaseFactory } from "../../application/factories";
import { EntityJsonPresenter } from "./presenters";

export function itemsRouter(factory: ProductsUseCaseFactory): Router {
    const router = Router();

    const presenter = new EntityJsonPresenter();
    const { query, create, mutation, delete: del } = httpRouteResolvers;

    router.get("/", query(factory.fetchItemsUseCase(), { presenter }));
    router.post("/", create(factory.createItemUseCase(), { presenter }));
    router.patch("/:item", mutation(factory.updateItemUseCase(), { presenter, map: { id: ["params", "item"] } }));
    router.delete("/:item", del(factory.deleteItemUseCase(), { map: { id: ["params", "item"] } }));

    return router;
}
