import { Router } from "express";

import { ProductsUseCaseFactory } from "../../application/factories";
import { SkuPriceJsonPresenter } from "./presenters";

export function skuPricesRouter(useCaseFactory: ProductsUseCaseFactory): Router {
    const router = Router();

    const presenter = new SkuPriceJsonPresenter();

    router.get("/", async (req, res, next) => {
        const { tenant, queryOptions } = req;
        const useCase = useCaseFactory.fetchSkuPricesUseCase();
        const response = await useCase.execute({ queryOptions, tenant });
        if (response.isLeft()) return next(response.value);
        return res.status(200).json(response.value.getData(presenter));
    });

    router.post("/", async (req, res, next) => {
        const { tenant } = req;
        const useCase = useCaseFactory.createSkuPriceUseCase();
        const response = await useCase.execute({ ...req.body, tenant });
        if (response.isLeft()) return next(response.value);
        return res.status(201).json(presenter.present(response.value));
    });

    router.patch("/:price", async (req, res, next) => {
        const { tenant } = req;
        const { price: id } = req.params;
        const useCase = useCaseFactory.updateSkuPriceUseCase();
        const response = await useCase.execute({ ...req.body, id, tenant });
        if (response.isLeft()) return next(response.value);
        return res.status(200).json(presenter.present(response.value));
    });

    router.delete("/:price", async (req, res, next) => {
        const { tenant } = req;
        const { price: id } = req.params;
        const useCase = useCaseFactory.deleteSkuPriceUseCase();
        const response = await useCase.execute({ id, tenant });
        if (response.isLeft()) return next(response.value);
        return res.status(204).send();
    });

    return router;
}
