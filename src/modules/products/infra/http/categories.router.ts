import { Router } from "express";

import { httpRouteResolvers } from "@/core/infra/http";

import { ProductsUseCaseFactory } from "../../application/factories";
import { EntityJsonPresenter } from "./presenters";

export function categoriesRouter(factory: ProductsUseCaseFactory): Router {
    const router = Router();

    const presenter = new EntityJsonPresenter();
    const { query, create, mutation, delete: del } = httpRouteResolvers;

    router.get("/", query(factory.fetchCategoriesUseCase(), { presenter }));
    router.post("/", create(factory.createCategoryUseCase(), { presenter }));
    router.patch(
        "/:category",
        mutation(factory.updateCategoryUseCase(), { presenter, map: { id: ["params", "category"] } }),
    );
    router.delete("/:category", del(factory.deleteCategoryUseCase(), { map: { id: ["params", "category"] } }));

    return router;
}
