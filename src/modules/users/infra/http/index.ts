import { Router } from "express";

import { UsersUseCaseFactory } from "../../application/factories";
import { authRouter } from "./auth.router";
import { usersRouter } from "./users.router";

export function createRouter(useCaseFactory: UsersUseCaseFactory): Router {
    const router = Router();

    router.use(usersRouter(useCaseFactory));
    router.use("/auth", authRouter(useCaseFactory));

    return router;
}
