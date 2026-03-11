import { Either } from "ts-arch-kit/dist/core/helpers";

import { Item } from "@/modules/products/domain/entities/product";
import { FetchUseCaseInput } from "@/shared/application";
import { MosaicError } from "@/shared/errors";
import { Pagination } from "@/shared/helpers";

import { IRepositoryFactory } from "../../../repositories";

export type FetchItemsUseCaseGateway = {
    repositoryFactory: IRepositoryFactory;
};

export type FetchItemsUseCaseInput = FetchUseCaseInput;

export type FetchItemsUseCaseOutput = Either<MosaicError, Pagination<Item>>;
