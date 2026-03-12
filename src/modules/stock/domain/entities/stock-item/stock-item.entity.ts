import { Either, left, right } from "ts-arch-kit/dist/core/helpers";

import { Entity } from "@/shared/domain";
import { ValidationError } from "@/shared/errors";
import { ZodValidator } from "@/shared/infra/libs/zod";

import { StockItemDTO, CreateStockItemDTO, StockItemSchema } from "./stock-item.dto";

export class StockItem extends Entity<StockItemDTO> {
    static create(input: CreateStockItemDTO): Either<ValidationError, StockItem> {
        const validDataOrError = ZodValidator.validate(input, StockItemSchema);
        if (!validDataOrError.success) return left(new ValidationError(StockItem.name, validDataOrError.errors));
        return right(new StockItem({ ...validDataOrError.data, id: 0 }));
    }

    static restore(input: StockItemDTO) {
        return new StockItem(input);
    }

    update(): Either<ValidationError, void> {
        return right(undefined);
    }

    getSchema() {
        return StockItemSchema;
    }
}
