import { Either, left, right } from "ts-arch-kit/dist/core/helpers";

import { Entity } from "@/shared/domain";
import { ValidationError } from "@/shared/errors";
import { ZodValidator } from "@/shared/infra/libs/zod";

import { MovementDTO, CreateMovementDTO, MovementSchema } from "./movement.dto";

export class Movement extends Entity<MovementDTO> {
    static create(input: CreateMovementDTO): Either<ValidationError, Movement> {
        const validDataOrError = ZodValidator.validate(input, MovementSchema);
        if (!validDataOrError.success) return left(new ValidationError(Movement.name, validDataOrError.errors));
        return right(new Movement({ ...validDataOrError.data, id: 0, createdAt: new Date() }));
    }

    static restore(input: MovementDTO) {
        return new Movement(input);
    }

    update(): Either<ValidationError, void> {
        return right(undefined);
    }

    getSchema() {
        return MovementSchema;
    }

    getQuantity() {
        return this.get("quantity").toNumber();
    }
}
