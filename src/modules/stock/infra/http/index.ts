import { Router } from "express";

import { StockUseCaseFactory } from "../../application/factories";
import { measurementUnitsRouter } from "./measurement-units.router";

export function createRouter(useCaseFactory: StockUseCaseFactory): Router {
    const router = Router();

    router.use("/measurement-units", measurementUnitsRouter(useCaseFactory));

    return router;
}
