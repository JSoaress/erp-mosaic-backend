import { Router } from "express";

import { SystemUseCaseFactory } from "@/system/application/factories";

export function createSystemRouter(useCaseFactory: SystemUseCaseFactory): Router {
    const router = Router();

    router.post("/subscribe", async (req, res, next) => {
        const useCase = useCaseFactory.subscribeToPlanUseCase();
        const response = await useCase.execute(req.body);
        if (response.isLeft()) return next(response.value);
        return res.status(201).json(response.value);
    });

    return router;
}
