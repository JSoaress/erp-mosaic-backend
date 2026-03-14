import { Request, Response, NextFunction } from "express";

import { CheckAuthenticatedUserUseCase } from "@/modules/users/application/use-cases/auth/check-authenticated-user";
import { InvalidTokenError } from "@/shared/errors";

export function authorization(useCase: CheckAuthenticatedUserUseCase) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { tenant } = req;
        const header = req.headers.authorization;
        if (!header) return next(new InvalidTokenError("Token de autenticação não informado."));
        const [, authToken] = header.split(" ");
        const result = await useCase.execute({ token: authToken, tenant });
        if (result.isLeft()) return next(result.value);
        req.authenticatedUser = result.value;
        return next();
    };
}
