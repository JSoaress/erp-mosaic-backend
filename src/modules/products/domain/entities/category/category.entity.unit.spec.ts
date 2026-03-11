/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, test } from "vitest";

import { ValidationError } from "@/shared/errors";

import { CreateCategoryDTO } from "./category.dto";
import { Category } from "./category.entity";

describe("category entity", () => {
    test("should create a new category (title)", () => {
        const input: CreateCategoryDTO = {
            name: "Bebidas",
            type: "title",
            parent: null,
        };
        const categoryOrError = Category.create(input);
        expect(categoryOrError.isRight()).toBeTruthy();
        const category = categoryOrError.value as Category;
        expect(category.isNew).toBeTruthy();
        expect(category.get("id")).toBe(0);
        expect(category.get("name")).toBe("Bebidas");
        expect(category.get("type")).toBe("title");
        expect(category.get("parentId")).toBeNull();
    });

    test("should create a new category (title with parent)", () => {
        const parent = Category.restore({
            id: 10,
            name: "Bebidas",
            type: "title",
            parentId: null,
        });
        const input: CreateCategoryDTO = {
            name: "Cervejas",
            type: "title",
            parent,
        };
        const categoryOrError = Category.create(input);
        expect(categoryOrError.isRight()).toBeTruthy();
        const category = categoryOrError.value as Category;
        expect(category.isNew).toBeTruthy();
        expect(category.get("id")).toBe(0);
        expect(category.get("name")).toBe("Cervejas");
        expect(category.get("type")).toBe("title");
        expect(category.get("parentId")).toBe(10);
    });

    test("should create a new category (category with parent)", () => {
        const parent = Category.restore({
            id: 12,
            name: "Bebidas",
            type: "title",
            parentId: null,
        });
        const input: CreateCategoryDTO = {
            name: "Destilados",
            type: "category",
            parent,
        };
        const categoryOrError = Category.create(input);
        expect(categoryOrError.isRight()).toBeTruthy();
        const category = categoryOrError.value as Category;
        expect(category.isNew).toBeTruthy();
        expect(category.get("id")).toBe(0);
        expect(category.get("name")).toBe("Destilados");
        expect(category.get("type")).toBe("category");
        expect(category.get("parentId")).toBe(12);
    });

    test("should create a new category (category without parent)", () => {
        const input: CreateCategoryDTO = {
            name: "Destilados",
            type: "category",
            parent: null,
        };
        const categoryOrError = Category.create(input);
        expect(categoryOrError.isRight()).toBeTruthy();
        const category = categoryOrError.value as Category;
        expect(category.isNew).toBeTruthy();
        expect(category.get("id")).toBe(0);
        expect(category.get("name")).toBe("Destilados");
        expect(category.get("type")).toBe("category");
        expect(category.get("parentId")).toBeNull();
    });

    test("should not create a category if properteies are invalid", () => {
        const input: CreateCategoryDTO = {
            name: "",
            type: "xxx" as any,
        };
        const categoryOrError = Category.create(input);
        expect(categoryOrError.isLeft()).toBeTruthy();
        const validationError = categoryOrError.value as ValidationError;
        expect(validationError.getError("name")).toEqual(["Muito pequeno: esperado que string tivesse >=1 caracteres"]);
        expect(validationError.getError("type")).toEqual(['Opção inválida: esperada uma das "title"|"category"']);
    });

    test("should not create a category if parent are of type 'category'", () => {
        const parent = Category.restore({
            id: 12,
            name: "Bebidas",
            type: "category",
            parentId: null,
        });
        const input: CreateCategoryDTO = {
            name: "Destilados",
            type: "category",
            parent,
        };
        const categoryOrError = Category.create(input);
        expect(categoryOrError.isLeft()).toBeTruthy();
        const validationError = categoryOrError.value as ValidationError;
        expect(validationError.getError("parent")).toEqual(['Categoria do tipo "category" não podem ter filhas.']);
    });
});
