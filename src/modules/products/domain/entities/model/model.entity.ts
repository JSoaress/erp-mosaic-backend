import { Either, left, right } from "ts-arch-kit/dist/core/helpers";

import { Entity } from "@/shared/domain";
import { ValidationError } from "@/shared/errors";
import { ZodValidator } from "@/shared/libs/zod";

import { CreateModelDTO, ModelDTO, ModelSchema, UpdateModelDTO, UpdateModelSchema } from "./model.dto";

export class Model extends Entity<ModelDTO> {
    static create(input: CreateModelDTO): Either<ValidationError, Model> {
        const validDataOrError = ZodValidator.validate(input, ModelSchema);
        if (!validDataOrError.success) return left(new ValidationError(Model.name, validDataOrError.errors));
        return right(new Model({ ...validDataOrError.data, id: 0 }));
    }

    static restore(input: ModelDTO) {
        return new Model(input);
    }

    getSchema() {
        return ModelSchema;
    }

    update(input: UpdateModelDTO): Either<ValidationError, void> {
        const validDataOrError = ZodValidator.validate(input, UpdateModelSchema);
        if (!validDataOrError.success) return left(new ValidationError(Model.name, validDataOrError.errors));
        this.updateProps(validDataOrError.data);
        return right(undefined);
    }
}
