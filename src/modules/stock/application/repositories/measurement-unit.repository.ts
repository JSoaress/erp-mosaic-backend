import { IRepository } from "@/shared/infra/database";

import { MeasurementUnit, MeasurementUnitDTO } from "../../domain/entities/measurement-unit";

export type MeasurementUnitWhereRepository = MeasurementUnitDTO;

export type IMeasurementUnitRepository = IRepository<MeasurementUnit, MeasurementUnitWhereRepository>;
