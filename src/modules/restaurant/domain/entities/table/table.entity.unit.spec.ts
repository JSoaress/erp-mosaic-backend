import { describe, expect, test } from "vitest";

import { TableIsNotCloseError, ValidationError } from "@/shared/errors";

import { Table } from "./table.entity";

describe("table entity", () => {
    test("should create a new table", () => {
        const tableOrError = Table.create({
            name: "Mesa 1",
            number: 1,
            seats: 4,
            active: true,
        });
        expect(tableOrError.isRight()).toBeTruthy();
        const table = tableOrError.value as Table;
        expect(table.isNew).toBeTruthy();
        expect(table.id).toBe(0);
        expect(table.get("name")).toBe("Mesa 1");
        expect(table.get("number")).toBe(1);
        expect(table.get("seats")).toBe(4);
        expect(table.get("status")).toBe("closed");
        expect(table.get("active")).toBeTruthy();
    });

    test("should not create a table with invalid properties", () => {
        const tableOrError = Table.create({
            name: "",
            number: undefined,
            seats: -1,
        });
        expect(tableOrError.isLeft()).toBeTruthy();
        const validationError = tableOrError.value as ValidationError;
        expect(validationError.getError("name")).toEqual(["Muito pequeno: esperado que string tivesse >=1 caracteres"]);
        expect(validationError.getError("number")).toEqual(["Tipo inválido: esperado número, recebido NaN"]);
        expect(validationError.getError("seats")).toEqual(["Muito pequeno: esperado que number fosse >=0"]);
    });

    test("should update a table", () => {
        const table = Table.restore({
            id: 1,
            name: "Mesa 1",
            number: 3,
            seats: 4,
            status: "closed",
            active: true,
        });
        const updateOrError = table.update({
            name: "Mesa 02",
            number: 2,
            seats: 2,
        });
        expect(updateOrError.isRight()).toBeTruthy();
        expect(table.id).toBe(1);
        expect(table.get("name")).toBe("Mesa 02");
        expect(table.get("number")).toBe(2);
        expect(table.get("seats")).toBe(2);
        expect(table.get("status")).toBe("closed");
        expect(table.get("active")).toBeTruthy();
    });

    test("should not update a table if properties are invalid", () => {
        const table = Table.restore({
            id: 1,
            name: "Mesa 1",
            number: 3,
            seats: 4,
            status: "closed",
            active: true,
        });
        const updateOrError = table.update({
            name: "",
            number: -2,
            seats: 0.5,
        });
        expect(updateOrError.isLeft()).toBeTruthy();
        const validationError = updateOrError.value as ValidationError;
        expect(validationError.getError("name")).toEqual(["Muito pequeno: esperado que string tivesse >=1 caracteres"]);
        expect(validationError.getError("number")).toEqual(["Muito pequeno: esperado que number fosse >=0"]);
        expect(validationError.getError("seats")).toEqual(["Tipo inválido: esperado int, recebido número"]);
    });

    test("should not update a table if table does not closed", () => {
        const table = Table.restore({
            id: 1,
            name: "Mesa 1",
            number: 3,
            seats: 4,
            status: "opened",
            active: true,
        });
        const updateOrError = table.update({
            name: "Mesa 02",
            number: 2,
            seats: 2,
        });
        expect(updateOrError.isLeft()).toBeTruthy();
        expect(updateOrError.value).toBeInstanceOf(TableIsNotCloseError);
    });
});
