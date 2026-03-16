import { IRepository } from "@/shared/database";

import { MeasurementUnit, MeasurementUnitDTO } from "../../domain/entities/measurement-unit";

export type MeasurementUnitWhereRepository = MeasurementUnitDTO;

export type IMeasurementUnitRepository = IRepository<MeasurementUnit, MeasurementUnitWhereRepository>;
