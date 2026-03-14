import { Router } from "express";

import { EntityJsonPresenter, httpDelete, httpGet, httpPatch, httpPost } from "@/shared/infra/http";

import { RestaurantUseCaseFactory } from "../../application/factories";

export function tablesRouter(useCaseFactory: RestaurantUseCaseFactory): Router {
    const router = Router();

    const presenter = new EntityJsonPresenter();

    router.get("/", httpGet(useCaseFactory.fetchTablesUseCase(), { presenter }));
    router.post("/", httpPost(useCaseFactory.createTableUseCase(), { presenter }));
    router.patch("/:id", httpPatch(useCaseFactory.updateTableUseCase(), { presenter }));
    router.delete("/:id", httpDelete(useCaseFactory.deleteTableUseCase()));

    return router;
}
