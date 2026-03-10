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
});
