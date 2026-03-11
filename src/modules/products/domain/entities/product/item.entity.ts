import { Either, left, right } from "ts-arch-kit/dist/core/helpers";

import { Entity } from "@/shared/domain";
import { ValidationError } from "@/shared/errors";
import { ZodValidator } from "@/shared/infra/libs/zod";

import { ItemDTO, CreateItemDTO, ItemSchema, UpdateItemDTO, UpdateItemSchema } from "./item.dto";

export class Item extends Entity<ItemDTO> {
    static create(input: CreateItemDTO): Either<ValidationError, Item> {
        const validDataOrError = ZodValidator.validate(input, ItemSchema);
        if (!validDataOrError.success) return left(new ValidationError(Item.name, validDataOrError.errors));
        return right(new Item({ ...validDataOrError.data, status: "pending", id: 0 }));
    }

    static restore(input: ItemDTO) {
        return new Item(input);
    }

    update(input: UpdateItemDTO): Either<ValidationError, void> {
        const validDataOrError = ZodValidator.validate(input, UpdateItemSchema);
        if (!validDataOrError.success) return left(new ValidationError(Item.name, validDataOrError.errors));
        this.updateProps(validDataOrError.data);
        return right(undefined);
    }

    getSchema() {
        return ItemSchema;
    }
}
