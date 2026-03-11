import { Router } from "express";

import { ProductsUseCaseFactory } from "../../application/factories";
import { EntityJsonPresenter } from "./presenters";

export function skusRouter(useCaseFactory: ProductsUseCaseFactory): Router {
    const router = Router();

    const defaultJsonPresenter = new EntityJsonPresenter();

    router.get("/", async (req, res, next) => {
        const { tenant, queryOptions } = req;
        const useCase = useCaseFactory.fetchSkusUseCase();
        const response = await useCase.execute({ queryOptions, tenant });
        if (response.isLeft()) return next(response.value);
        return res.status(200).json(response.value.getData(defaultJsonPresenter));
    });

    router.post("/", async (req, res, next) => {
        const { tenant } = req;
        const useCase = useCaseFactory.createSkuUseCase();
        const response = await useCase.execute({ ...req.body, tenant });
        if (response.isLeft()) return next(response.value);
        return res.status(201).json(defaultJsonPresenter.present(response.value));
    });

    router.patch("/:sku", async (req, res, next) => {
        const { tenant } = req;
        const { sku: id } = req.params;
        const useCase = useCaseFactory.updateSkuUseCase();
        const response = await useCase.execute({ ...req.body, id, tenant });
        if (response.isLeft()) return next(response.value);
        return res.status(200).json(defaultJsonPresenter.present(response.value));
    });

    router.delete("/:sku", async (req, res, next) => {
        const { tenant } = req;
        const { sku: id } = req.params;
        const useCase = useCaseFactory.deleteSkuUseCase();
        const response = await useCase.execute({ id, tenant });
        if (response.isLeft()) return next(response.value);
        return res.status(204).send();
    });

    return router;
}
