import { describe, expect, test } from "vitest";

import { ValidationError } from "@/shared/errors";

import { Tenant } from "./tenant.vo";

describe("tenant value object", () => {
    test("should create a new tenant", () => {
        const now = new Date();
        const tenantOrError = Tenant.create("12345678900", now);
        expect(tenantOrError.isRight()).toBeTruthy();
        const tenant = tenantOrError.value as Tenant;
        expect(tenant.getName()).toBe("tenant_12345678900");
        expect(tenant.getCreatedAt()).toEqual(now);
    });

    test("should not create a tenant with invalid properties (name invalid)", () => {
        const tenantOrError = Tenant.create("", new Date());
        expect(tenantOrError.isLeft()).toBeTruthy();
        const validationError = tenantOrError.value as ValidationError;
        expect(validationError.getError("name")).toEqual(["Muito pequeno: esperado que string tivesse >=1 caracteres"]);
    });

    test("should not create a tenant with invalid properties (createdAt bigger than today)", () => {
        const date = new Date();
        date.setHours(date.getHours() + 1);
        const tenantOrError = Tenant.create("john-doe", date);
        expect(tenantOrError.isLeft()).toBeTruthy();
        const validationError = tenantOrError.value as ValidationError;
        expect(validationError.getError("createdAt")).toEqual(["Deve ser menor ou igual a data atual."]);
    });
});
