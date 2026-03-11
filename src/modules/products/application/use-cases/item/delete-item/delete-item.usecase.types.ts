import { DeleteUseCaseInput, DeleteUseCaseOutput } from "@/shared/application";

import { IRepositoryFactory } from "../../../repositories";

export type DeleteItemUseCaseGateway = {
    repositoryFactory: IRepositoryFactory;
};

export type DeleteItemUseCaseInput = DeleteUseCaseInput;

export type DeleteItemUseCaseOutput = DeleteUseCaseOutput;
