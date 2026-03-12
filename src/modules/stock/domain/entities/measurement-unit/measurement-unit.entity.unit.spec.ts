import { describe, expect, test } from "vitest";

import { ValidationError } from "@/shared/errors";

import { MeasurementUnit } from "./measurement-unit.entity";

describe("measurement unit entity", () => {
    test("should create a new measurement unit", () => {
        const measurementUnitOrError = MeasurementUnit.create({
            name: "Unity",
            initials: "UN",
        });
        expect(measurementUnitOrError.isRight()).toBeTruthy();
        const measurementUnit = measurementUnitOrError.value as MeasurementUnit;
        expect(measurementUnit.isNew).toBeTruthy();
        expect(measurementUnit.get("id")).toBe(0);
        expect(measurementUnit.get("name")).toBe("Unity");
        expect(measurementUnit.get("initials")).toBe("UN");
    });

    test("should not create a measurement unit with invalid properties (empty)", () => {
        const measurementUnitOrError = MeasurementUnit.create({
            name: "",
            initials: "",
        });
        expect(measurementUnitOrError.isLeft()).toBeTruthy();
        const validationError = measurementUnitOrError.value as ValidationError;
        expect(validationError.getError("name")).toEqual(["Muito pequeno: esperado que string tivesse >=1 caracteres"]);
        expect(validationError.getError("initials")).toEqual(["Muito pequeno: esperado que string tivesse >=1 caracteres"]);
    });

    test("should not create a measurement unit with invalid properties (very long intials)", async () => {
        const measurementUnitOrError = MeasurementUnit.create({
            name: "Unity",
            initials: "Unity",
        });
        expect(measurementUnitOrError.isLeft()).toBeTruthy();
        const validationError = measurementUnitOrError.value as ValidationError;
        expect(validationError.getError("initials")).toEqual(["Muito grande: esperado que string tivesse <=4 caracteres"]);
    });
});
