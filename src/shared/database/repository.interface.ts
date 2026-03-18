/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRepository as IBaseRepository, ISetUnitOfWork, UnitOfWork } from "ts-arch-kit/dist/database";

import { EntityProps } from "@/shared/domain";

export type IRepository<T extends EntityProps, W = Record<string, any>> = ISetUnitOfWork & IBaseRepository<T, W>;

export interface IBaseRepositoryFactory {
    createUnitOfWork(): UnitOfWork;
}
