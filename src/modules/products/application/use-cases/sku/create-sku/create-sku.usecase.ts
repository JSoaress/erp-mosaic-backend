import { left, right } from "ts-arch-kit/dist/core/helpers";

import { Category } from "@/modules/products/domain/entities/category";
import { Sku } from "@/modules/products/domain/entities/product";
import { UseCase } from "@/shared/application";
import { InvalidSkuCategory, SkuCodeTakenError } from "@/shared/errors";

import { CreateSkuUseCaseGateway, CreateSkuUseCaseInput, CreateSkuUseCaseOutput } from "./create-sku.usecase.types";

export class CreateSkuUseCase extends UseCase<CreateSkuUseCaseInput, CreateSkuUseCaseOutput> {
    constructor(private gateway: CreateSkuUseCaseGateway) {
        super();
    }

    protected async impl(input: CreateSkuUseCaseInput): Promise<CreateSkuUseCaseOutput> {
        const { repositoryFactory, fkServiceValidation } = this.gateway;
        const unitOfWork = repositoryFactory.createUnitOfWork();
        const categoryRepository = repositoryFactory.createCategoryRepository();
        const skuRepository = repositoryFactory.createSkuRepository();
        unitOfWork.prepare(categoryRepository, skuRepository);
        return unitOfWork.execute<CreateSkuUseCaseOutput>(async () => {
            const skuOrError = Sku.create(input);
            if (skuOrError.isLeft()) return left(skuOrError.value);
            const newSku = skuOrError.value;
            const codeAlreadyExists = await skuRepository.exists({ code: newSku.get("code") });
            if (codeAlreadyExists) return left(new SkuCodeTakenError(newSku.get("code")));
            const fkResult = await fkServiceValidation.validate(unitOfWork, repositoryFactory, newSku);
            if (fkResult.isLeft()) return left(fkResult.value);
            if (newSku.get("categoryId")) {
                const category = (await categoryRepository.findById(newSku.get("categoryId") as number)) as Category;
                if (!category.isCategory()) return left(new InvalidSkuCategory(category.get("type")));
            }
            const createdSku = await skuRepository.save(newSku);
            return right(createdSku);
        });
    }
}
