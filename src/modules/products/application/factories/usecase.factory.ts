import { ForeignKeyValidationService } from "@/shared/application/services";

import { IRepositoryFactory } from "../repositories";
import { CreateBrandUseCase } from "../use-cases/brand/create-brand";
import { DeleteBrandUseCase } from "../use-cases/brand/delete-brand";
import { FetchBrandsUseCase } from "../use-cases/brand/fetch-brands";
import { UpdateBrandUseCase } from "../use-cases/brand/update-brand";
import { CreateModelUseCase } from "../use-cases/model/create-model";
import { DeleteModelUseCase } from "../use-cases/model/delete-model";
import { FetchModelsUseCase } from "../use-cases/model/fetch-models";
import { UpdateModelUseCase } from "../use-cases/model/update-model";

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
}
