import { beforeAll, describe, expect, test } from "vitest";

import knexConfig from "@/shared/infra/database/knex/knexfile";
import { KnexUnitOfWork } from "@/shared/infra/database/knex/repositories";
import { IRepositoryFactory } from "@/system/application/repositories/repository-factory";
import { Subscriber } from "@/system/domain/entities/subscriber";
import { KnexRepositoryFactory } from "@/system/infra/database/knex";

import { SubscribeToPlanUseCase } from "./subscribe-to-plan.usecase";
import { SubscribeToPlanUseCaseInput } from "./subscribe-to-plan.usecase.types";

let repositoryFactory: IRepositoryFactory;
let useCase: SubscribeToPlanUseCase;

describe("subscribe to plan use case", () => {
    beforeAll(() => {
        repositoryFactory = new KnexRepositoryFactory(knexConfig.development);
        useCase = new SubscribeToPlanUseCase({ repositoryFactory });
    });

    test("should subscribe and create schema", async () => {
        const input: SubscribeToPlanUseCaseInput = {
            name: "John Doe",
            document: "12345678900",
            isTrial: true,
        };
        const response = await useCase.execute(input);
        expect(response.isRight()).toBeTruthy();
        const subscriber = response.value as Subscriber;
        const uow = repositoryFactory.createUnitOfWork() as KnexUnitOfWork;
        const subscriberRepository = repositoryFactory.createSubscriberRepository();
        uow.prepare(subscriberRepository);
        await uow.execute(async () => {
            const savedSubscriber = await subscriberRepository.findById(subscriber.getId());
            expect(subscriber.id).toBe(savedSubscriber?.id);
            expect(subscriber.get("name")).toBe(savedSubscriber?.get("name"));
            expect(subscriber.get("document")).toBe(savedSubscriber?.get("document"));
            expect(subscriber.get("startedAt")).toEqual(savedSubscriber?.get("startedAt"));
            expect(subscriber.get("endAt")).toEqual(savedSubscriber?.get("endAt"));
            expect(subscriber.get("active")).toBe(savedSubscriber?.get("active"));
            // check schema
            const trx = uow.getTransaction();
            const result = await trx.raw("SELECT 1 AS tenant FROM pg_namespace WHERE nspname = ?", [
                subscriber.getTenant().getName(),
            ]);
            expect(result.rows[0].tenant).toBe(1);
        });
    });
});
