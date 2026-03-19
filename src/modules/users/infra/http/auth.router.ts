import { Router } from "express";

import { httpRouteResolvers } from "@/core/infra/http";

import { UsersUseCaseFactory } from "../../application/factories";

export function authRouter(factory: UsersUseCaseFactory): Router {
    const router = Router();

    router.post("/login", httpRouteResolvers.mutation(factory.createInitialUserUseCase(), { map: { args: ["body"] } }));

    return router;
}
