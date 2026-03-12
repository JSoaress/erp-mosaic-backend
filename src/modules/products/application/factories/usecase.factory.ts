import { ForeignKeyValidationService } from "@/shared/application/services";

import { IRepositoryFactory } from "../repositories";
import { CreateBrandUseCase } from "../use-cases/brand/create-brand";
import { DeleteBrandUseCase } from "../use-cases/brand/delete-brand";
import { FetchBrandsUseCase } from "../use-cases/brand/fetch-brands";
import { UpdateBrandUseCase } from "../use-cases/brand/update-brand";
import { CreateCategoryUseCase } from "../use-cases/category/create-category";
import { DeleteCategoryUseCase } from "../use-cases/category/delete-category";
import { FetchCategoriesUseCase } from "../use-cases/category/fetch-categories";
import { UpdateCategoryUseCase } from "../use-cases/category/update-category";
import { CreateItemUseCase } from "../use-cases/item/create-item";
import { DeleteItemUseCase } from "../use-cases/item/delete-item";
import { FetchItemsUseCase } from "../use-cases/item/fetch-items";
import { UpdateItemUseCase } from "../use-cases/item/update-item";
import { CreateModelUseCase } from "../use-cases/model/create-model";
import { DeleteModelUseCase } from "../use-cases/model/delete-model";
import { FetchModelsUseCase } from "../use-cases/model/fetch-models";
import { UpdateModelUseCase } from "../use-cases/model/update-model";
import {
    CreateSkuPriceUseCase,
    DeleteSkuPriceUseCase,
    FetchSkuPricesUseCase,
    UpdateSkuPriceUseCase,
} from "../use-cases/sku-price";
import { CreateSkuUseCase } from "../use-cases/sku/create-sku";
import { DeleteSkuUseCase } from "../use-cases/sku/delete-sku";
import { FetchSkusUseCase } from "../use-cases/sku/fetch-skus";
import { UpdateSkuUseCase } from "../use-cases/sku/update-sku";

export class ProductsUseCaseFactory {
    constructor(
        private repositoryFactory: IRepositoryFactory,
        private fkValidationService: ForeignKeyValidationService,
    ) {}

    fetchBrandsUseCase(): FetchBrandsUseCase {
        return new FetchBrandsUseCase({ repositoryFactory: this.repositoryFactory });
    }

    createBrandUseCase(): CreateBrandUseCase {
        return new CreateBrandUseCase({ repositoryFactory: this.repositoryFactory });
    }

    updateBrandUseCase(): UpdateBrandUseCase {
        return new UpdateBrandUseCase({ repositoryFactory: this.repositoryFactory });
    }

    deleteBrandUseCase(): DeleteBrandUseCase {
        return new DeleteBrandUseCase({ repositoryFactory: this.repositoryFactory });
    }

    fetchModelsUseCase(): FetchModelsUseCase {
        return new FetchModelsUseCase({ repositoryFactory: this.repositoryFactory });
    }

    createModelUseCase(): CreateModelUseCase {
        return new CreateModelUseCase({
            repositoryFactory: this.repositoryFactory,
            fkValidationService: this.fkValidationService,
        });
    }

    updateModelUseCase(): UpdateModelUseCase {
        return new UpdateModelUseCase({
            repositoryFactory: this.repositoryFactory,
            fkValidationService: this.fkValidationService,
        });
    }

    deleteModelUseCase(): DeleteModelUseCase {
        return new DeleteModelUseCase({ repositoryFactory: this.repositoryFactory });
    }

    fetchCategoriesUseCase(): FetchCategoriesUseCase {
        return new FetchCategoriesUseCase({ repositoryFactory: this.repositoryFactory });
    }

    createCategoryUseCase(): CreateCategoryUseCase {
        return new CreateCategoryUseCase({ repositoryFactory: this.repositoryFactory });
    }

    updateCategoryUseCase(): UpdateCategoryUseCase {
        return new UpdateCategoryUseCase({ repositoryFactory: this.repositoryFactory });
    }

    deleteCategoryUseCase(): DeleteCategoryUseCase {
        return new DeleteCategoryUseCase({ repositoryFactory: this.repositoryFactory });
    }

    fetchItemsUseCase(): FetchItemsUseCase {
        return new FetchItemsUseCase({ repositoryFactory: this.repositoryFactory });
    }

    createItemUseCase(): CreateItemUseCase {
        return new CreateItemUseCase({
            repositoryFactory: this.repositoryFactory,
            fkValidationService: this.fkValidationService,
        });
    }

    updateItemUseCase(): UpdateItemUseCase {
        return new UpdateItemUseCase({
            repositoryFactory: this.repositoryFactory,
            fkValidationService: this.fkValidationService,
        });
    }

    deleteItemUseCase(): DeleteItemUseCase {
        return new DeleteItemUseCase({ repositoryFactory: this.repositoryFactory });
    }

    fetchSkusUseCase(): FetchSkusUseCase {
        return new FetchSkusUseCase({ repositoryFactory: this.repositoryFactory });
    }

    createSkuUseCase(): CreateSkuUseCase {
        return new CreateSkuUseCase({
            repositoryFactory: this.repositoryFactory,
            fkServiceValidation: this.fkValidationService,
        });
    }

    updateSkuUseCase(): UpdateSkuUseCase {
        return new UpdateSkuUseCase({
            repositoryFactory: this.repositoryFactory,
            fkServiceValidation: this.fkValidationService,
        });
    }

    deleteSkuUseCase(): DeleteSkuUseCase {
        return new DeleteSkuUseCase({ repositoryFactory: this.repositoryFactory });
    }

    fetchSkuPricesUseCase() {
        return FetchSkuPricesUseCase({ repositoryFactory: this.repositoryFactory });
    }

    createSkuPriceUseCase() {
        return CreateSkuPriceUseCase({
            repositoryFactory: this.repositoryFactory,
            fkValidationService: this.fkValidationService,
        });
    }

    updateSkuPriceUseCase() {
        return UpdateSkuPriceUseCase({
            repositoryFactory: this.repositoryFactory,
            fkValidationService: this.fkValidationService,
        });
    }

    deleteSkuPriceUseCase() {
        return DeleteSkuPriceUseCase({ repositoryFactory: this.repositoryFactory });
    }
}
