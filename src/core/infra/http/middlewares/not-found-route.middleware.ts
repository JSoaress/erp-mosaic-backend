import { Request, Response, NextFunction } from "express";

import { MosaicError } from "@/shared/errors";

export class HttpRouteNotFoundError extends MosaicError {
    constructor(
        private method: string,
        private url: string,
    ) {
        super(`A rota HTTP solicitada não está registrada.`, false);
    }

    toJSON(): Record<string, unknown> {
        return {
            ...super.toJSON(),
            method: this.method,
            url: this.url,
        };
    }
}

export function notFoundRoute(req: Request, res: Response, next: NextFunction) {
    const error = new HttpRouteNotFoundError(req.method, req.url);
    next(error);
}
