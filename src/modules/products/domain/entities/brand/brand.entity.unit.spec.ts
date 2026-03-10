import { describe, expect, test } from "vitest";

import { ValidationError } from "@/shared/errors";

import { Brand } from "./brand.entity";

describe("brand entity", () => {
    test("should create a new brand", () => {
        const brandOrError = Brand.create({
            name: "Apple",
        });
        expect(brandOrError.isRight()).toBeTruthy();
        const brand = brandOrError.value as Brand;
        expect(brand.isNew).toBeTruthy();
        expect(brand.id).toBe(0);
        expect(brand.get("name")).toBe("Apple");
    });

    test("should not create a brand with invalid properties", () => {
        const brandOrError = Brand.create({
            name: "",
        });
        expect(brandOrError.isLeft()).toBeTruthy();
        const validationError = brandOrError.value as ValidationError;
        expect(validationError.getError("name")).toEqual(["Muito pequeno: esperado que string tivesse >=1 caracteres"]);
    });

    test("should update a brand", () => {
        const brand = Brand.restore({
            id: 7,
            name: "samsung",
        });
        const updateOrError = brand.update({ name: "Samsung" });
        expect(updateOrError.isRight()).toBeTruthy();
        expect(brand.get("id")).toBe(7);
        expect(brand.get("name")).toBe("Samsung");
    });

    test("should not update a brand if properties are invalid", () => {
        const brand = Brand.restore({
            id: 7,
            name: "samsung",
        });
        const updateOrError = brand.update({ name: "" });
        expect(updateOrError.isLeft()).toBeTruthy();
        const validationError = updateOrError.value as ValidationError;
        expect(validationError.getError("name")).toEqual(["Muito pequeno: esperado que string tivesse >=1 caracteres"]);
        expect(brand.get("name")).toBe("samsung");
    });
});
