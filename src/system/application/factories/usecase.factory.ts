import { ModuleRegistry } from "@/core/module/module-registry";

import { IRepositoryFactory } from "../repositories/repository-factory";
import { GetSubscriberUseCase } from "../use-cases/subscriber/get-subscriber";
import { SubscribeToPlanUseCase } from "../use-cases/subscriber/subscribe-to-plan";

export class SystemUseCaseFactory {
    constructor(
        private repositoryFactory: IRepositoryFactory,
        private moduleRegistry: ModuleRegistry,
    ) {}

    subscribeToPlanUseCase(): SubscribeToPlanUseCase {
        return new SubscribeToPlanUseCase({
            repositoryFactory: this.repositoryFactory,
            moduleRegistry: this.moduleRegistry,
        });
    }

    getSubscriberUseCase(): GetSubscriberUseCase {
        return new GetSubscriberUseCase({ repositoryFactory: this.repositoryFactory });
    }
}
