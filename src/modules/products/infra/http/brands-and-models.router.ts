import { Router } from "express";

import { ProductsUseCaseFactory } from "../../application/factories";
import { EntityJsonPresenter } from "./presenters";

export function brandsAndModelsRouter(router: Router, useCaseFactory: ProductsUseCaseFactory) {
    const defaultJsonPresenter = new EntityJsonPresenter();

    router.get("/brands", async (req, res, next) => {
        const { tenant } = req;
        const useCase = useCaseFactory.fetchBrandsUseCase();
        const response = await useCase.execute({ tenant });
        if (response.isLeft()) return next(response.value);
        return res.status(200).json(response.value.getData(defaultJsonPresenter));
    });

    router.post("/brands", async (req, res, next) => {
        const { tenant } = req;
        const useCase = useCaseFactory.createBrandUseCase();
        const response = await useCase.execute({ ...req.body, tenant });
        if (response.isLeft()) return next(response.value);
        return res.status(201).json(defaultJsonPresenter.present(response.value));
    });

    router.patch("/brands/:brand", async (req, res, next) => {
        const { tenant } = req;
        const { brand } = req.params;
        const useCase = useCaseFactory.updateBrandUseCase();
        const response = await useCase.execute({ ...req.body, id: brand, tenant });
        if (response.isLeft()) return next(response.value);
        return res.status(200).json(defaultJsonPresenter.present(response.value));
    });

    router.delete("/brands/:brand", async (req, res, next) => {
        const { tenant } = req;
        const { brand } = req.params;
        const useCase = useCaseFactory.deleteBrandUseCase();
        const response = await useCase.execute({ id: brand, tenant });
        if (response.isLeft()) return next(response.value);
        return res.status(204).send();
    });

    router.get("/brands/:brand/models", async (req, res, next) => {
        const { tenant } = req;
        const { brand } = req.params;
        const useCase = useCaseFactory.fetchModelsUseCase();
        const response = await useCase.execute({ queryOptions: { filter: { brandId: parseInt(brand, 10) } }, tenant });
        if (response.isLeft()) return next(response.value);
        return res.status(200).json(response.value.getData(defaultJsonPresenter));
    });

    router.post("/brands/:brand/models", async (req, res, next) => {
        const { tenant } = req;
        const { brand: brandId } = req.params;
        const useCase = useCaseFactory.createModelUseCase();
        const response = await useCase.execute({ ...req.body, brandId, tenant });
        if (response.isLeft()) return next(response.value);
        return res.status(201).json(defaultJsonPresenter.present(response.value));
    });

    router.patch("/brands/:brand/models/:model", async (req, res, next) => {
        const { tenant } = req;
        const { brand: brandId, model } = req.params;
        const useCase = useCaseFactory.updateModelUseCase();
        const response = await useCase.execute({ ...req.body, id: model, brandId, tenant });
        if (response.isLeft()) return next(response.value);
        return res.status(200).json(defaultJsonPresenter.present(response.value));
    });

    router.delete("/brands/:brand/models/:model", async (req, res, next) => {
        const { tenant } = req;
        const { brand: brandId, model } = req.params;
        const useCase = useCaseFactory.deleteModelUseCase();
        const response = await useCase.execute({ id: model, brandId, tenant });
        if (response.isLeft()) return next(response.value);
        return res.status(204).send();
    });
}
