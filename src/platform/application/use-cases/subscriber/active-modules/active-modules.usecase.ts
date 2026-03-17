import { left, right } from "ts-arch-kit/dist/core/helpers";
import { UnitOfWork } from "ts-arch-kit/dist/database";

import { UseCase } from "@/shared/application";
import { NotFoundModelError } from "@/shared/errors";
import { ISubscriberRepository } from "@/platform/application/repositories";
import { Subscriber } from "@/platform/domain/entities/subscriber";

import {
    ActiveModulesUseCaseGateway,
    ActiveModulesUseCaseInput,
    ActiveModulesUseCaseOutput,
} from "./active-modules.usecase.types";

export class ActiveModulesUseCase extends UseCase<ActiveModulesUseCaseInput, ActiveModulesUseCaseOutput> {
    private unitOfWork: UnitOfWork;
    private subscriberRepository: ISubscriberRepository;

    constructor(private gateway: ActiveModulesUseCaseGateway) {
        super();
        this.unitOfWork = gateway.repositoryFactory.createUnitOfWork();
        this.subscriberRepository = gateway.repositoryFactory.createSubscriberRepository();
        this.unitOfWork.prepare(this.subscriberRepository);
    }

    protected async impl({ subscriberId, modules }: ActiveModulesUseCaseInput): Promise<ActiveModulesUseCaseOutput> {
        const result = await this.unitOfWork.execute<ActiveModulesUseCaseOutput>(async () => {
            const subscriber = await this.subscriberRepository.findById(subscriberId);
            if (!subscriber) return left(new NotFoundModelError(Subscriber.name, subscriberId));
            modules.forEach((module) => subscriber.addModule(module));
            await this.subscriberRepository.save(subscriber);
            return right(subscriber);
        });
        if (result.isLeft()) return left(result.value);
        const subscriber = result.value;
        const uow = this.gateway.repositoryFactory.createUnitOfWork(subscriber.getTenant());
        const tenantRepo = this.gateway.repositoryFactory.createTenantRepository();
        uow.prepare(tenantRepo);
        await uow.execute(async () => {
            const migrationPaths = subscriber
                .get("enabledModules")
                .map((m) => this.gateway.moduleRegistry.get(m).migrations);
            await tenantRepo.runMigrations(migrationPaths);
        });
        return result;
    }
}
