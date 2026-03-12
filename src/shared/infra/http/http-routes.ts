/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";
import { IPresenter } from "ts-arch-kit/dist/core/helpers";

import { UseCase } from "@/shared/application";

export function httpGet(useCase: UseCase<any, any>, presenter?: IPresenter<any, any>) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { tenant, queryOptions } = req;
        const response = await useCase.execute({ queryOptions, tenant });
        if (response.isLeft()) return next(response.value);
        return res.status(200).json(response.value.getData(presenter));
    };
}

export function httpPost(useCase: UseCase<any, any>, presenter?: IPresenter<any, any>) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { tenant } = req;
        const response = await useCase.execute({ ...req.body, tenant });
        if (response.isLeft()) return next(response.value);
        return res.status(201).json(presenter ? presenter.present(response.value) : response.value);
    };
}

export function httpPatch(useCase: UseCase<any, any>, presenter?: IPresenter<any, any>) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { tenant } = req;
        const { id } = req.params;
        const response = await useCase.execute({ ...req.body, id, tenant });
        if (response.isLeft()) return next(response.value);
        return res.status(200).json(presenter ? presenter.present(response.value) : response.value);
    };
}

export function httpDelete(useCase: UseCase<any, any>) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { tenant } = req;
        const { id } = req.params;
        const response = await useCase.execute({ id, tenant });
        if (response.isLeft()) return next(response.value);
        return res.status(204).send();
    };
}
