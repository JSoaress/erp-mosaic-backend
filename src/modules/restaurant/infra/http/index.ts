import { Router } from "express";

import { RestaurantUseCaseFactory } from "../../application/factories";
import { tablesRouter } from "./tables.router";

export function createRouter(useCaseFactory: RestaurantUseCaseFactory): Router {
    const router = Router();

    router.use("/tables", tablesRouter(useCaseFactory));

    return router;
}
