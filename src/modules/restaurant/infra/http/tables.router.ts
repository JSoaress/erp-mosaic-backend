import { Router } from "express";

import { EntityJsonPresenter, httpRouteResolvers } from "@/core/infra/http";

import { RestaurantUseCaseFactory } from "../../application/factories";

export function tablesRouter(factory: RestaurantUseCaseFactory): Router {
    const router = Router();

    const presenter = new EntityJsonPresenter();
    const { query, create, mutation, delete: del } = httpRouteResolvers;

    router.get("/", query(factory.fetchTablesUseCase(), { presenter }));
    router.post("/", create(factory.createTableUseCase(), { presenter }));
    router.patch("/:table", mutation(factory.updateTableUseCase(), { presenter, map: { id: ["params", "table"] } }));
    router.delete("/:table", del(factory.deleteTableUseCase(), { map: { id: ["params", "table"] } }));
    return router;
}
