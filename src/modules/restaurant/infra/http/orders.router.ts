import { Router } from "express";

import { httpRouteResolvers } from "@/core/infra/http";

import { RestaurantUseCaseFactory } from "../../application/factories";
import { OrderJsonPresenter } from "./presenters";

export function ordersRouter(factory: RestaurantUseCaseFactory): Router {
    const router = Router();

    const presenter = new OrderJsonPresenter();
    const { query, create, mutation } = httpRouteResolvers;

    router.get("/", query(factory.fetchOrdersUseCase(), { presenter }));
    router.post("/open", create(factory.openOrderUseCase(), { presenter }));
    router.post(
        "/:order/add-item",
        create(factory.addOrderItemUseCase(), { presenter, map: { orderId: ["params", "order"] } }),
    );
    router.put(
        "/:order/cancel-item",
        mutation(factory.cancelOrderItemUseCase(), { presenter, map: { orderId: ["params", "order"] } }),
    );

    // router.get("/", httpGet(factory.fetchOrdersUseCase(), { presenter }));
    // router.post("/open", httpPost(useCaseFactory.openOrderUseCase()));
    // router.post("/:id/add-item", async (req, res, next) => {
    //     const { tenant, authenticatedUser } = req;
    //     const { id: orderId } = req.params;
    //     const useCase = useCaseFactory.addOrderItemUseCase();
    //     const response = await useCase.execute({ ...req.body, orderId, authenticatedUser, tenant });
    //     if (response.isLeft()) return next(response.value);
    //     return res.status(201).json(presenter.present(response.value));
    // });
    // router.put("/:id/cancel-item", async (req, res, next) => {
    //     const { tenant, authenticatedUser } = req;
    //     const { id: orderId } = req.params;
    //     const useCase = useCaseFactory.cancelOrderItemUseCase();
    //     const response = await useCase.execute({ ...req.body, orderId, authenticatedUser, tenant });
    //     if (response.isLeft()) return next(response.value);
    //     return res.status(200).json(presenter.present(response.value));
    // });

    return router;
}
