import { Either, left, right } from "ts-arch-kit/dist/core/helpers";

import { Entity } from "@/shared/domain";
import { TableIsNotCloseError, ValidationError } from "@/shared/errors";
import { ZodValidator } from "@/shared/infra/libs/zod";

import { TableDTO, CreateTableDTO, TableSchema, UpdateTableDTO, UpdateTableSchema } from "./table.dto";

export class Table extends Entity<TableDTO> {
    static create(input: CreateTableDTO): Either<ValidationError, Table> {
        const validDataOrError = ZodValidator.validate(input, TableSchema);
        if (!validDataOrError.success) return left(new ValidationError(Table.name, validDataOrError.errors));
        return right(new Table({ ...validDataOrError.data, id: 0, status: "closed" }));
    }

    static restore(input: TableDTO) {
        return new Table(input);
    }

    update(input: UpdateTableDTO): Either<ValidationError | TableIsNotCloseError, void> {
        if (this.props.status !== "closed") return left(new TableIsNotCloseError());
        const validDataOrError = ZodValidator.validate(input, UpdateTableSchema);
        if (!validDataOrError.success) return left(new ValidationError(Table.name, validDataOrError.errors));
        this.updateProps(validDataOrError.data);
        return right(undefined);
    }

    getSchema() {
        return TableSchema;
    }

    open() {
        this.props.status = "opened";
    }

    book() {
        this.props.status = "reserved";
    }

    close() {
        this.props.status = "closed";
    }
}
