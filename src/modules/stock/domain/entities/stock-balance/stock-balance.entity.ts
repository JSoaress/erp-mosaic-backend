import { Either, left, right } from "ts-arch-kit/dist/core/helpers";

import { Entity } from "@/shared/domain";
import { ValidationError } from "@/shared/errors";
import { ZodValidator } from "@/shared/infra/libs/zod";

import { StockBalanceDTO, CreateStockBalanceDTO, StockBalanceSchema } from "./stock-balance.dto";

export class StockBalance extends Entity<StockBalanceDTO> {
    static create(input: CreateStockBalanceDTO): Either<ValidationError, StockBalance> {
        const validDataOrError = ZodValidator.validate(input, StockBalanceSchema);
        if (!validDataOrError.success) return left(new ValidationError(StockBalance.name, validDataOrError.errors));
        return right(new StockBalance({ ...validDataOrError.data, id: 0, createdAt: new Date(), updatedAt: null }));
    }

    static restore(input: StockBalanceDTO) {
        return new StockBalance(input);
    }

    update(): Either<ValidationError, void> {
        return right(undefined);
    }

    getSchema() {
        return StockBalanceSchema;
    }

    getQuantity() {
        return this.get("quantity").toNumber();
    }
}
