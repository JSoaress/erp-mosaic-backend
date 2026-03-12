import { Router } from "express";

import { EntityJsonPresenter, httpDelete, httpGet, httpPatch, httpPost } from "@/shared/infra/http";

import { StockUseCaseFactory } from "../../application/factories";

export function measurementUnitsRouter(useCaseFactory: StockUseCaseFactory): Router {
    const router = Router();

    const defaultJsonPresenter = new EntityJsonPresenter();

    router.get("/", httpGet(useCaseFactory.fetchMeasurementUnitsUseCase(), defaultJsonPresenter));
    router.post("/", httpPost(useCaseFactory.createMeasurementUnitUseCase(), defaultJsonPresenter));
    router.patch("/:id", httpPatch(useCaseFactory.updateMeasurementUnitUseCase(), defaultJsonPresenter));
    router.delete("/:id", httpDelete(useCaseFactory.deleteMeasurementUnitUseCase()));

    return router;
}
