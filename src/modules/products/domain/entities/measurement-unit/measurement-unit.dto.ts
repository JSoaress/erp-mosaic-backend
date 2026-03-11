import { EntityProps } from "@/shared/domain";
import { z } from "@/shared/infra/libs/zod";

export const MeasurementUnitSchema = z.object({
    name: z.string().min(1),
    initials: z.string().min(1).max(4),
});

export const UpdateMeasurementUnitSchema = MeasurementUnitSchema.partial();

type Schema = typeof MeasurementUnitSchema;

export type MeasurementUnitDTO = EntityProps & z.output<Schema>;

export type CreateMeasurementUnitDTO = z.input<Schema>;

export type UpdateMeasurementUnitDTO = z.input<typeof MeasurementUnitSchema>;
