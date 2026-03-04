import { Either } from "ts-arch-kit/dist/core/helpers";
import { QueryOptions } from "ts-arch-kit/dist/database";

import { NotFoundModelError } from "@/shared/errors";
import { SubscriberWhereRepository } from "@/system/application/repositories";
import { IRepositoryFactory } from "@/system/application/repositories/repository-factory";
import { Subscriber } from "@/system/domain/entities/subscriber";

export type GetSubscriberUseCaseGateway = {
    repositoryFactory: IRepositoryFactory;
};

export type GetSubscriberUseCaseInput = {
    queryOptions: Omit<QueryOptions<SubscriberWhereRepository>, "pagination">;
};

export type GetSubscriberUseCaseOutput = Either<NotFoundModelError, Subscriber>;
