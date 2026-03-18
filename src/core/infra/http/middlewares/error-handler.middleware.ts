/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import { HttpStatusCodes } from "ts-arch-kit/dist/http";

import * as appErrors from "@/shared/errors";

import { HttpRouteNotFoundError } from "./not-found-route.middleware";

export function errorHandler(err: Error | appErrors.MosaicError, req: Request, res: Response, next: NextFunction) {
    if (!(err instanceof appErrors.MosaicError))
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
    switch (err.constructor) {
        // 401
        case appErrors.InvalidTokenError:
        case appErrors.InvalidCredentialsError:
        case appErrors.TenantIdNotProvidedError:
            return res.status(HttpStatusCodes.UNAUTHORIZED).json(err);
        // 404
        case appErrors.NotFoundModelError:
        case HttpRouteNotFoundError:
            return res.status(HttpStatusCodes.NOT_FOUND).json(err);
        // 409
        case appErrors.EmailTakenError:
        case appErrors.InvalidUserError:
        case appErrors.SkuCodeTakenError:
        case appErrors.InvalidSkuCategory:
        case appErrors.TableIsNotCloseError:
        case appErrors.OpenOrderError:
        case appErrors.AddOrderItemConflictError:
        case appErrors.CancelOrderItemError:
            return res.status(HttpStatusCodes.CONFLICT).json(err);
        // 422
        case appErrors.ValidationError:
        case appErrors.InvalidPasswordError:
        case appErrors.AddOrderItemValidationError:
            return res.status(HttpStatusCodes.UNPROCESSABLE_ENTITY).json(err);
        // 500
        default:
            return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
}
