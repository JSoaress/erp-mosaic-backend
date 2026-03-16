import { Either, left, right } from "ts-arch-kit/dist/core/helpers";

import { Entity, Validity } from "@/shared/domain";
import { ValidationError } from "@/shared/errors";
import { ZodValidator } from "@/shared/libs/zod";

import { SkuPriceDTO, CreateSkuPriceDTO, SkuPriceSchema, UpdateSkuPriceDTO, UpdateSkuPriceSchema } from "./sku-price.dto";

export class SkuPrice extends Entity<SkuPriceDTO> {
    static create(input: CreateSkuPriceDTO): Either<ValidationError, SkuPrice> {
        const validDataOrError = ZodValidator.validate(input, SkuPriceSchema);
        if (!validDataOrError.success) return left(new ValidationError(SkuPrice.name, validDataOrError.errors));
        return right(new SkuPrice({ ...validDataOrError.data, id: 0 }));
    }

    static restore(input: SkuPriceDTO) {
        return new SkuPrice(input);
    }

    update(input: UpdateSkuPriceDTO): Either<ValidationError, void> {
        const validDataOrError = ZodValidator.validate(input, UpdateSkuPriceSchema);
        if (!validDataOrError.success) return left(new ValidationError(SkuPrice.name, validDataOrError.errors));
        this.updateProps(validDataOrError.data);
        return right(undefined);
    }

    getSchema() {
        return SkuPriceSchema;
    }

    get price() {
        return this.get("price").cents;
    }

    isActive(date = new Date()) {
        return this.get("active") && new Validity(this.get("validFrom"), this.get("validTo")).isActive(date);
    }
}
