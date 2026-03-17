import { Request, Response, NextFunction } from "express";

import { TenantIdNotProvidedError } from "@/shared/errors";
import { GetSubscriberUseCase } from "@/platform/application/use-cases/subscriber/get-subscriber";

export function getTenant(getSubscriberUseCase: GetSubscriberUseCase) {
    return async (req: Request, res: Response, next: NextFunction) => {
        if (req.originalUrl.startsWith("/api/system")) return next();
        const tenantId = req.headers["x-tenant-id"] as string;
        if (!tenantId) return next(new TenantIdNotProvidedError());
        const response = await getSubscriberUseCase.execute({ queryOptions: { filter: { document: tenantId } } });
        if (response.isLeft()) return next(response.value);
        const subscriber = response.value;
        req.subscriber = subscriber;
        req.tenant = subscriber.getTenant();
        return next();
    };
}
