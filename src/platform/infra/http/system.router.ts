import { Router } from "express";

import { PlatformUseCaseFactory } from "@/platform/application/factories";

export function createPlatformRouter(useCaseFactory: PlatformUseCaseFactory): Router {
    const router = Router();

    router.post("/subscribe", async (req, res, next) => {
        const useCase = useCaseFactory.subscribeToPlanUseCase();
        const response = await useCase.execute(req.body);
        if (response.isLeft()) return next(response.value);
        return res.status(201).json(response.value);
    });

    router.put("/active-modules", async (req, res, next) => {
        const useCase = useCaseFactory.activeModulesUseCase();
        const response = await useCase.execute(req.body);
        if (response.isLeft()) return next(response.value);
        return res.status(200).json(response.value);
    });

    return router;
}
