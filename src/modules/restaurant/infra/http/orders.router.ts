import { Router } from "express";

import { httpGet, httpPost } from "@/shared/infra/http";

import { RestaurantUseCaseFactory } from "../../application/factories";
import { OrderJsonPresenter } from "./presenters";

export function ordersRouter(useCaseFactory: RestaurantUseCaseFactory): Router {
    const router = Router();

    const presenter = new OrderJsonPresenter();

    router.get("/", httpGet(useCaseFactory.fetchOrdersUseCase(), { presenter }));
    router.post("/open", httpPost(useCaseFactory.openOrderUseCase()));
    router.post("/:order/add-item", async (req, res, next) => {
        const { tenant, authenticatedUser } = req;
        const { order: orderId } = req.params;
        const useCase = useCaseFactory.addOrderItemUseCase();
        const response = await useCase.execute({ ...req.body, orderId, authenticatedUser, tenant });
        if (response.isLeft()) return next(response.value);
        return res.status(201).json(presenter.present(response.value));
    });

    return router;
}
