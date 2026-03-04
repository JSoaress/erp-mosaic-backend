import { left, right } from "ts-arch-kit/dist/core/helpers";
import { UnitOfWork } from "ts-arch-kit/dist/database";

import { UseCase } from "@/shared/application";
import { ISubscriberRepository, ITenantRepository } from "@/system/application/repositories";
import { Subscriber } from "@/system/domain/entities/subscriber";

import {
    SubscribeToPlanUseCaseGateway,
    SubscribeToPlanUseCaseInput,
    SubscribeToPlanUseCaseOutput,
} from "./subscribe-to-plan.usecase.types";

export class SubscribeToPlanUseCase extends UseCase<SubscribeToPlanUseCaseInput, SubscribeToPlanUseCaseOutput> {
    private unitOfWork: UnitOfWork;
    private subscriberRepository: ISubscriberRepository;
    private tenantRepository: ITenantRepository;

    constructor(private gateway: SubscribeToPlanUseCaseGateway) {
        super();
        this.unitOfWork = gateway.repositoryFactory.createUnitOfWork();
        this.subscriberRepository = gateway.repositoryFactory.createSubscriberRepository();
        this.tenantRepository = gateway.repositoryFactory.createTenantRepository();
        this.unitOfWork.prepare(this.subscriberRepository, this.tenantRepository);
    }

    protected async impl({ isTrial, ...input }: SubscribeToPlanUseCaseInput): Promise<SubscribeToPlanUseCaseOutput> {
        const r = await this.unitOfWork.execute<SubscribeToPlanUseCaseOutput>(async () => {
            const subscriberOrError = Subscriber.create(input);
            if (subscriberOrError.isLeft()) return left(subscriberOrError.value);
            if (isTrial) console.log("plano de teste");
            const unsavedSubscriber = subscriberOrError.value;
            const newSubscriber = await this.subscriberRepository.save(unsavedSubscriber);
            await this.tenantRepository.createTenant(newSubscriber.getTenant());
            return right(newSubscriber);
        });
        if (r.isLeft()) return left(r.value);
        const uow = this.gateway.repositoryFactory.createUnitOfWork(r.value.getTenant());
        const tenantRepo = this.gateway.repositoryFactory.createTenantRepository();
        uow.prepare(tenantRepo);
        await uow.execute(async () => {
            const migrationsPath = input.enabledModules.map((module) => this.gateway.moduleRegistry.get(module).migrations);
            await tenantRepo.runMigrations(migrationsPath);
        });
        return r;
    }
}
