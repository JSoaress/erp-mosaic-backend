import { Router } from "express";

import { UsersUseCaseFactory } from "../../application/factories";

export function authRouter(useCaseFactory: UsersUseCaseFactory): Router {
    const router = Router();

    router.post("/login", async (req, res, next) => {
        const { tenant } = req;
        const { email, password } = req.body;
        const useCase = useCaseFactory.authenticateUserUseCase();
        const response = await useCase.execute({ email, password, tenant });
        if (response.isLeft()) return next(response.value);
        return res.status(200).json(response.value);
    });

    return router;
}
