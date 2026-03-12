import { Either, left, right } from "ts-arch-kit/dist/core/helpers";

import { Entity } from "@/shared/domain";
import { ValidationError } from "@/shared/errors";
import { ZodValidator } from "@/shared/infra/libs/zod";

import {
    MeasurementUnitDTO,
    CreateMeasurementUnitDTO,
    MeasurementUnitSchema,
    UpdateMeasurementUnitDTO,
    UpdateMeasurementUnitSchema,
} from "./measurement-unit.dto";

export class MeasurementUnit extends Entity<MeasurementUnitDTO> {
    static create(input: CreateMeasurementUnitDTO): Either<ValidationError, MeasurementUnit> {
        const validDataOrError = ZodValidator.validate(input, MeasurementUnitSchema);
        if (!validDataOrError.success) return left(new ValidationError(MeasurementUnit.name, validDataOrError.errors));
        return right(new MeasurementUnit({ ...validDataOrError.data, id: 0 }));
    }

    static restore(input: MeasurementUnitDTO) {
        return new MeasurementUnit(input);
    }

    update(input: UpdateMeasurementUnitDTO): Either<ValidationError, void> {
        const validDataOrError = ZodValidator.validate(input, UpdateMeasurementUnitSchema);
        if (!validDataOrError.success) return left(new ValidationError(MeasurementUnit.name, validDataOrError.errors));
        this.updateProps(validDataOrError.data);
        return right(undefined);
    }

    getSchema() {
        return MeasurementUnitSchema;
    }
}
