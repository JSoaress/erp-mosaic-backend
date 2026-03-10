import { describe, expect, test } from "vitest";

import { CreateModelDTO } from "./model.dto";
import { Model } from "./model.entity";

describe("model entity", () => {
    test("should create a new model", () => {
        const input: CreateModelDTO = {
            name: "iPhone 17 Pro",
            brandId: 10,
        };
        const modelOrError = Model.create(input);
        expect(modelOrError.isRight()).toBeTruthy();
        const model = modelOrError.value as Model;
        expect(model.isNew).toBeTruthy();
        expect(model.get("id")).toBe(0);
        expect(model.get("name")).toBe("iPhone 17 Pro");
        expect(model.get("brandId")).toBe(10);
    });
});
