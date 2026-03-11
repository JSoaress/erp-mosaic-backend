import { Either, left, right } from "ts-arch-kit/dist/core/helpers";

import { Entity } from "@/shared/domain";
import { ValidationError } from "@/shared/errors";
import { ZodValidator } from "@/shared/infra/libs/zod";

import { SkuDTO, CreateSkuDTO, SkuSchema, UpdateSkuDTO, UpdateSkuSchema } from "./sku.dto";

export class Sku extends Entity<SkuDTO> {
    static create(input: CreateSkuDTO): Either<ValidationError, Sku> {
        const validDataOrError = ZodValidator.validate(input, SkuSchema);
        if (!validDataOrError.success) return left(new ValidationError(Sku.name, validDataOrError.errors));
        return right(new Sku({ ...validDataOrError.data, id: 0 }));
    }

    static restore(input: SkuDTO) {
        return new Sku(input);
    }

    update(input: UpdateSkuDTO): Either<ValidationError, void> {
        const validDataOrError = ZodValidator.validate(input, UpdateSkuSchema);
        if (!validDataOrError.success) return left(new ValidationError(Sku.name, validDataOrError.errors));
        this.updateProps(validDataOrError.data);
        return right(undefined);
    }

    getSchema() {
        return SkuSchema;
    }
}
