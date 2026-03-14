/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";
import { IPresenter } from "ts-arch-kit/dist/core/helpers";

import { UseCase } from "@/shared/application";

type HttpRouteOptions = {
    statusCode?: number;
    presenter?: IPresenter<any, any>;
};

export function httpGet(useCase: UseCase<any, any>, opt?: HttpRouteOptions) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { statusCode = 200, presenter } = opt || {};
        const { tenant, authenticatedUser, queryOptions } = req;
        const response = await useCase.execute({ queryOptions, authenticatedUser, tenant });
        if (response.isLeft()) return next(response.value);
        return res.status(statusCode).json(response.value.getData(presenter));
    };
}

export function httpPost(useCase: UseCase<any, any>, opt?: HttpRouteOptions) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { statusCode = 201, presenter } = opt || {};
        const { tenant, authenticatedUser } = req;
        const response = await useCase.execute({ ...req.body, authenticatedUser, tenant });
        if (response.isLeft()) return next(response.value);
        return res.status(statusCode).json(presenter ? presenter.present(response.value) : response.value);
    };
}

export function httpPatch(useCase: UseCase<any, any>, opt?: HttpRouteOptions) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { statusCode = 200, presenter } = opt || {};
        const { tenant, authenticatedUser } = req;
        const { id } = req.params;
        const response = await useCase.execute({ ...req.body, id, authenticatedUser, tenant });
        if (response.isLeft()) return next(response.value);
        return res.status(statusCode).json(presenter ? presenter.present(response.value) : response.value);
    };
}

export function httpDelete(useCase: UseCase<any, any>, opt?: Pick<HttpRouteOptions, "statusCode">) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { statusCode = 204 } = opt || {};
        const { tenant, authenticatedUser } = req;
        const { id } = req.params;
        const response = await useCase.execute({ id, authenticatedUser, tenant });
        if (response.isLeft()) return next(response.value);
        return res.status(statusCode).send();
    };
}
