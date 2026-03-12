/* eslint-disable max-classes-per-file */
import { right } from "ts-arch-kit/dist/core/helpers";
import { UnitOfWork } from "ts-arch-kit/dist/database";

import { Sku } from "@/modules/products/domain/entities/product";
import { SkuPrice } from "@/modules/products/domain/entities/sku-price";
import { CreateUseCase, DeleteUseCase, FetchUseCase, UpdateUseCase } from "@/shared/application";

import { IRepositoryFactory, ISkuPriceRepository } from "../../repositories";
import {
    CreateSkuPriceUseCaseGateway,
    CreateSkuPriceUseCaseInput,
    CreateSkuPriceUseCaseOutput,
    DeleteSkuPriceUseCaseGateway,
    DeleteSkuPriceUseCaseInput,
    DeleteSkuPriceUseCaseOutput,
    FetchSkuPricesUseCaseGateway,
    FetchSkuPricesUseCaseInput,
    FetchSkuPricesUseCaseOutput,
    UpdateSkuPriceUseCaseGateway,
    UpdateSkuPriceUseCaseInput,
    UpdateSkuPriceUseCaseOutput,
} from "./types";

export function CreateSkuPriceUseCase(gateway: CreateSkuPriceUseCaseGateway) {
    return new (class extends CreateUseCase<CreateSkuPriceUseCaseInput, CreateSkuPriceUseCaseOutput, IRepositoryFactory> {
        protected async preSave(
            skuPrice: SkuPrice,
            uow: UnitOfWork,
            repository: ISkuPriceRepository,
        ): Promise<CreateSkuPriceUseCaseOutput> {
            if (!skuPrice.get("main")) return right(skuPrice);
            const skuRepository = this.gateway.repositoryFactory.createSkuRepository();
            uow.prepare(skuRepository);
            const sku = (await skuRepository.findById(skuPrice.get("skuId"))) as Sku;
            await repository.clearPrimaryPriceBySku(sku);
            return right(skuPrice);
        }
    })({
        ...gateway,
        repo: "createSkuPriceRepository",
        createEntityFn: SkuPrice.create,
    });
}

export function FetchSkuPricesUseCase(gateway: FetchSkuPricesUseCaseGateway) {
    return new FetchUseCase<FetchSkuPricesUseCaseInput, FetchSkuPricesUseCaseOutput, IRepositoryFactory>({
        ...gateway,
        repo: "createSkuPriceRepository",
    });
}

export function UpdateSkuPriceUseCase(gateway: UpdateSkuPriceUseCaseGateway) {
    return new (class extends UpdateUseCase<UpdateSkuPriceUseCaseInput, UpdateSkuPriceUseCaseOutput, IRepositoryFactory> {
        protected async preSave(
            skuPrice: SkuPrice,
            uow: UnitOfWork,
            repository: ISkuPriceRepository,
        ): Promise<CreateSkuPriceUseCaseOutput> {
            if (!skuPrice.get("main")) return right(skuPrice);
            const skuRepository = this.gateway.repositoryFactory.createSkuRepository();
            uow.prepare(skuRepository);
            const sku = (await skuRepository.findById(skuPrice.get("skuId"))) as Sku;
            await repository.clearPrimaryPriceBySku(sku);
            return right(skuPrice);
        }
    })({
        ...gateway,
        repo: "createSkuPriceRepository",
        entityName: SkuPrice.name,
    });
}

export function DeleteSkuPriceUseCase(gateway: DeleteSkuPriceUseCaseGateway) {
    return new DeleteUseCase<DeleteSkuPriceUseCaseInput, DeleteSkuPriceUseCaseOutput, IRepositoryFactory>({
        ...gateway,
        repo: "createSkuPriceRepository",
        entityName: SkuPrice.name,
    });
}
