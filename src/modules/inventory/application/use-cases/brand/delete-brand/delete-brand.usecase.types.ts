import { DeleteUseCaseInput, DeleteUseCaseOutput } from "@/shared/application";

import { IRepositoryFactory } from "../../../repositories";

export type DeleteBrandUseCaseGateway = {
    repositoryFactory: IRepositoryFactory;
};

export type DeleteBrandUseCaseInput = DeleteUseCaseInput;

export type DeleteBrandUseCaseOutput = DeleteUseCaseOutput;
