import { Router } from "express";

import { EntityJsonPresenter, httpDelete, httpGet, httpPatch, httpPost } from "@/shared/infra/http";

import { StockUseCaseFactory } from "../../application/factories";

export function measurementUnitsRouter(useCaseFactory: StockUseCaseFactory): Router {
    const router = Router();

    const presenter = new EntityJsonPresenter();

    router.get("/", httpGet(useCaseFactory.fetchMeasurementUnitsUseCase(), { presenter }));
    router.post("/", httpPost(useCaseFactory.createMeasurementUnitUseCase(), { presenter }));
    router.patch("/:id", httpPatch(useCaseFactory.updateMeasurementUnitUseCase(), { presenter }));
    router.delete("/:id", httpDelete(useCaseFactory.deleteMeasurementUnitUseCase()));

    return router;
}
