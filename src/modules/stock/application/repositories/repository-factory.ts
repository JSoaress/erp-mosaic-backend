import { IBaseRepositoryFactory } from "@/shared/infra/database";

import { IMeasurementUnitRepository } from "./measurement-unit.repository";

export interface IRepositoryFactory extends IBaseRepositoryFactory {
    createMeasurementUnitRepository(): IMeasurementUnitRepository;
}
