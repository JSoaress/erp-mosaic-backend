import { Either, left, right } from "ts-arch-kit/dist/core/helpers";

import { Entity } from "@/shared/domain";
import { ValidationError } from "@/shared/errors";
import { ZodValidator } from "@/shared/infra/libs/zod";

import { BrandDTO, BrandSchema, CreateBrandDTO, UpdateBrandDTO, UpdateBrandSchema } from "./brand.dto";

export class Brand extends Entity<BrandDTO> {
    static create(input: CreateBrandDTO): Either<ValidationError, Brand> {
        const validDataOrError = ZodValidator.validate(input, BrandSchema);
        if (!validDataOrError.success) return left(new ValidationError(Brand.name, validDataOrError.errors));
        return right(new Brand({ ...validDataOrError.data, id: 0 }));
    }

    static restore(input: BrandDTO) {
        return new Brand(input);
    }

    update(input: UpdateBrandDTO): Either<ValidationError, void> {
        const validDataOrError = ZodValidator.validate(input, UpdateBrandSchema);
        if (!validDataOrError.success) return left(new ValidationError(Brand.name, validDataOrError.errors));
        this.updateProps(validDataOrError.data);
        return right(undefined);
    }

    getSchema() {
        return BrandSchema;
    }
}
