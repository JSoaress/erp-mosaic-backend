import { DeleteUseCaseInput, DeleteUseCaseOutput } from "@/shared/application";

import { IRepositoryFactory } from "../../../repositories";

export type DeleteCategoryUseCaseGateway = {
    repositoryFactory: IRepositoryFactory;
};

export type DeleteCategoryUseCaseInput = DeleteUseCaseInput;

export type DeleteCategoryUseCaseOutput = DeleteUseCaseOutput;
