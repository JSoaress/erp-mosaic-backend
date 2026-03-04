import { Router } from "express";

import { UsersUseCaseFactory } from "../../application/factories";

export function createUsersRouter(useCaseFactory: UsersUseCaseFactory): Router {
    const router = Router();

    router.post("/superuser", async (req, res, next) => {
        const { tenant } = req;
        const useCase = useCaseFactory.createInitialUserUseCase();
        const response = await useCase.execute({ ...req.body, tenant });
        if (response.isLeft()) return next(response.value);
        return res.status(201).json(response.value);
    });

    return router;
}
