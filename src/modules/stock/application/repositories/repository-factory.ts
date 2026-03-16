import { IBaseRepositoryFactory } from "@/shared/database";

import { IMeasurementUnitRepository } from "./measurement-unit.repository";

export interface IRepositoryFactory extends IBaseRepositoryFactory {
    createMeasurementUnitRepository(): IMeasurementUnitRepository;
}
