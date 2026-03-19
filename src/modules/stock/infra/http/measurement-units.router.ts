import { Router } from "express";

import { EntityJsonPresenter, httpRouteResolvers } from "@/core/infra/http";

import { StockUseCaseFactory } from "../../application/factories";

export function measurementUnitsRouter(factory: StockUseCaseFactory): Router {
    const router = Router();

    const presenter = new EntityJsonPresenter();
    const { query, create, mutation, delete: del } = httpRouteResolvers;

    router.get("/", query(factory.fetchMeasurementUnitsUseCase(), { presenter }));
    router.post("/", create(factory.createMeasurementUnitUseCase(), { presenter }));
    router.patch("/:unit", mutation(factory.updateMeasurementUnitUseCase(), { presenter, map: { id: ["params", "unit"] } }));
    router.delete("/:unit", del(factory.deleteMeasurementUnitUseCase(), { map: { id: ["params", "unit"] } }));

    return router;
}
