/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";
import { IPresenter } from "ts-arch-kit/dist/core/helpers";

import { UseCase } from "@/shared/application";
import { Pagination } from "@/shared/helpers";

type Source = "body" | "params" | "query" | "headers" | "req";

type ParamMap = Record<string, [Source, string?]>;

function extractParams(req: Request, map?: ParamMap): Record<string, any> {
    if (!map) return {};
    let result: Record<string, any> = {};
    Object.entries(map).forEach(([key, [source, path]]) => {
        let value: any;
        if (source === "body") value = path ? req.body?.[path] : req.body;
        if (source === "params") value = path ? req.params?.[path] : req.params;
        if (source === "query") value = path ? req.query?.[path] : req.query;
        if (source === "headers") value = path ? req.headers?.[path.toLowerCase()] : req.headers;
        if (source === "req") value = path ? (req as any)[path] : req;
        if (key === "args" && value !== undefined) result = { ...result, ...value };
        if (key !== "args" && value !== undefined) result[key] = value;
    });
    return result;
}

type HttpRouteResolverOptions = {
    statusCode?: number;
    presenter?: IPresenter<any, any>;
    map?: ParamMap;
};

function createResolver(useCase: UseCase<any, any>, opt?: HttpRouteResolverOptions) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { statusCode = 200, presenter, map } = opt || {};
            const { authenticatedUser, queryOptions } = req;
            const mapped = extractParams(req, map);
            const input = { ...mapped, queryOptions, authenticatedUser };
            const response = await useCase.execute(input);
            if (response.isLeft()) return next(response.value);
            const data = response.value;
            if (data instanceof Pagination) return res.status(statusCode).json(data.getData(presenter));
            return res.status(statusCode).json(presenter ? presenter.present(data) : data);
        } catch (error) {
            return next(error);
        }
    };
}

export const httpRouteResolvers = {
    query: (useCase: UseCase<any, any>, opt?: HttpRouteResolverOptions) => createResolver(useCase, opt),
    mutation: (useCase: UseCase<any, any>, opt?: HttpRouteResolverOptions) =>
        createResolver(useCase, { ...opt, map: { ...opt?.map, args: ["body"] } }),
    create: (useCase: UseCase<any, any>, opt?: HttpRouteResolverOptions) =>
        createResolver(useCase, { ...opt, statusCode: 201, map: { ...opt?.map, args: ["body"] } }),
    delete: (useCase: UseCase<any, any>, opt?: HttpRouteResolverOptions) =>
        createResolver(useCase, { ...opt, statusCode: 204 }),
};
