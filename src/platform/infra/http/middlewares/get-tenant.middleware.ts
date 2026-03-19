import { Request, Response, NextFunction } from "express";

import { GetSubscriberUseCase } from "@/platform/application/use-cases/subscriber/get-subscriber";
import { TenantIdNotProvidedError } from "@/shared/errors";

export function getTenant(getUseCase: () => GetSubscriberUseCase) {
    return async (req: Request, res: Response, next: NextFunction) => {
        if (req.originalUrl.startsWith("/api/platform")) return next();
        const tenantId = req.headers["x-tenant-id"] as string;
        if (!tenantId) return next(new TenantIdNotProvidedError());
        const useCase = getUseCase();
        const response = await useCase.execute({ queryOptions: { filter: { document: tenantId } } });
        if (response.isLeft()) return next(response.value);
        const subscriber = response.value;
        req.subscriber = subscriber;
        return next();
    };
}
