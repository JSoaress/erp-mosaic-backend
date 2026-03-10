import { Router } from "express";

import { ProductsUseCaseFactory } from "../../application/factories";
import { EntityJsonPresenter } from "./presenters";

export function brandsAndModelsRouter(router: Router, useCaseFactory: ProductsUseCaseFactory) {
    const brandJsonPresenter = new EntityJsonPresenter();

    router.get("/brands", async (req, res, next) => {
        const { tenant } = req;
        const useCase = useCaseFactory.fetchBrandsUseCase();
        const response = await useCase.execute({ tenant });
        if (response.isLeft()) return next(response.value);
        return res.status(200).json(response.value.getData(brandJsonPresenter));
    });

    router.post("/brands", async (req, res, next) => {
        const { tenant } = req;
        const useCase = useCaseFactory.createBrandUseCase();
        const response = await useCase.execute({ ...req.body, tenant });
        if (response.isLeft()) return next(response.value);
        return res.status(201).json(brandJsonPresenter.present(response.value));
    });

    router.patch("/brands/:brand", async (req, res, next) => {
        const { tenant } = req;
        const { brand } = req.params;
        const useCase = useCaseFactory.updateBrandUseCase();
        const response = await useCase.execute({ ...req.body, id: brand, tenant });
        if (response.isLeft()) return next(response.value);
        return res.status(200).json(brandJsonPresenter.present(response.value));
    });

    router.delete("/brands/:brand", async (req, res, next) => {
        const { tenant } = req;
        const { brand } = req.params;
        const useCase = useCaseFactory.deleteBrandUseCase();
        const response = await useCase.execute({ id: brand, tenant });
        if (response.isLeft()) return next(response.value);
        return res.status(204).send();
    });

    // router.post("/brands/:brand/models", async (req, res, next) => {
    //     const { tenant } = req;
    //     const { brand } = req.params;
    //     const useCase = useCaseFactory.createModelUseCase();
    //     const response = await useCase.execute({ ...req.body, brandId: brand, tenant });
    //     if (response.isLeft()) return next(response.value);
    //     return res.status(201).json(response.value);
    // });
}
