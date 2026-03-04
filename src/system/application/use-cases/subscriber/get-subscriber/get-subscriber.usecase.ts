import { left, right } from "ts-arch-kit/dist/core/helpers";
import { UnitOfWork } from "ts-arch-kit/dist/database";

import { UseCase } from "@/shared/application";
import { NotFoundModelError } from "@/shared/errors";
import { ISubscriberRepository } from "@/system/application/repositories";
import { Subscriber } from "@/system/domain/entities/subscriber";

import {
    GetSubscriberUseCaseGateway,
    GetSubscriberUseCaseInput,
    GetSubscriberUseCaseOutput,
} from "./get-subscriber.usecase.types";

export class GetSubscriberUseCase extends UseCase<GetSubscriberUseCaseInput, GetSubscriberUseCaseOutput> {
    private unitOfWork: UnitOfWork;
    private subscriberRepository: ISubscriberRepository;

    constructor({ repositoryFactory }: GetSubscriberUseCaseGateway) {
        super();
        this.unitOfWork = repositoryFactory.createUnitOfWork();
        this.subscriberRepository = repositoryFactory.createSubscriberRepository();
        this.unitOfWork.prepare(this.subscriberRepository);
    }

    protected async impl({ queryOptions }: GetSubscriberUseCaseInput): Promise<GetSubscriberUseCaseOutput> {
        return this.unitOfWork.execute<GetSubscriberUseCaseOutput>(async () => {
            const subscriber = await this.subscriberRepository.findOne(queryOptions);
            if (!subscriber) return left(new NotFoundModelError(Subscriber.name, queryOptions.filter));
            return right(subscriber);
        });
    }
}
