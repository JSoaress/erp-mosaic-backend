import { BaseKnexRepositoryFactory } from "@/core/infra/database/knex";
import { DefaultKnexRepository } from "@/core/infra/database/knex/repositories";
import { IOrderRepository, IRepositoryFactory, ITableRepository } from "@/modules/restaurant/application/repositories";

import * as mappers from "./mappers";
import { OrderKnexRepository } from "./repositories";

export class RestaurantKnexRepositoryFactory extends BaseKnexRepositoryFactory implements IRepositoryFactory {
    createTableRepository(): ITableRepository {
        return new DefaultKnexRepository("restaurant_tables", new mappers.TableKnexMapper());
    }

    createOrderRepository(): IOrderRepository {
        return new OrderKnexRepository();
    }
}
