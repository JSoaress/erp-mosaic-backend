import { left, right } from "ts-arch-kit/dist/core/helpers";

import { Category } from "@/modules/products/domain/entities/category";
import { Sku } from "@/modules/products/domain/entities/product";
import { UseCase } from "@/shared/application";
import { InvalidSkuCategory, NotFoundModelError } from "@/shared/errors";

import { UpdateSkuUseCaseGateway, UpdateSkuUseCaseInput, UpdateSkuUseCaseOutput } from "./update-sku.usecase.types";

export class UpdateSkuUseCase extends UseCase<UpdateSkuUseCaseInput, UpdateSkuUseCaseOutput> {
    constructor(private gateway: UpdateSkuUseCaseGateway) {
        super();
    }

    protected async impl({ id, ...input }: UpdateSkuUseCaseInput): Promise<UpdateSkuUseCaseOutput> {
        const { repositoryFactory, fkServiceValidation } = this.gateway;
        const unitOfWork = repositoryFactory.createUnitOfWork();
        const categoryRepository = repositoryFactory.createCategoryRepository();
        const skuRepository = repositoryFactory.createSkuRepository();
        unitOfWork.prepare(categoryRepository, skuRepository);
        return unitOfWork.execute<UpdateSkuUseCaseOutput>(async () => {
            const sku = await skuRepository.findById(id);
            if (!sku) return left(new NotFoundModelError(Sku.name, id));
            const updateOrError = sku.update(input);
            if (updateOrError.isLeft()) return left(updateOrError.value);
            const fkResult = await fkServiceValidation.validate(unitOfWork, repositoryFactory, sku);
            if (fkResult.isLeft()) return left(fkResult.value);
            if (sku.get("categoryId")) {
                const category = (await categoryRepository.findById(sku.get("categoryId") as number)) as Category;
                if (!category.isCategory()) return left(new InvalidSkuCategory(category.get("type")));
            }
            const updatedSku = await skuRepository.save(sku);
            return right(updatedSku);
        });
    }
}
