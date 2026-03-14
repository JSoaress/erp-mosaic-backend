import { IRepository } from "@/shared/infra/database";

import { Order, OrderDTO, OrderStatus } from "../../domain/entities/order";

export type OrderWhereRepository = OrderDTO & { status: OrderStatus; total: number };

export type IOrderRepository = IRepository<Order, OrderWhereRepository>;
