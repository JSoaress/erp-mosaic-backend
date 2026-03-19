import { Router } from "express";

import { httpRouteResolvers } from "@/core/infra/http";

import { UsersUseCaseFactory } from "../../application/factories";

export function usersRouter(factory: UsersUseCaseFactory): Router {
    const router = Router();

    router.post("/superuser", httpRouteResolvers.create(factory.createInitialUserUseCase(), { map: { args: ["body"] } }));

    return router;
}
