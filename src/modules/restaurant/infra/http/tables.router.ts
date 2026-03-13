import { Router } from "express";

import { EntityJsonPresenter, httpDelete, httpGet, httpPatch, httpPost } from "@/shared/infra/http";

import { RestaurantUseCaseFactory } from "../../application/factories";

export function tablesRouter(useCaseFactory: RestaurantUseCaseFactory): Router {
    const router = Router();

    const defaultJsonPresenter = new EntityJsonPresenter();

    router.get("/", httpGet(useCaseFactory.fetchTablesUseCase(), defaultJsonPresenter));
    router.post("/", httpPost(useCaseFactory.createTableUseCase(), defaultJsonPresenter));
    router.patch("/:id", httpPatch(useCaseFactory.updateTableUseCase(), defaultJsonPresenter));
    router.delete("/:id", httpDelete(useCaseFactory.deleteTableUseCase()));

    return router;
}
