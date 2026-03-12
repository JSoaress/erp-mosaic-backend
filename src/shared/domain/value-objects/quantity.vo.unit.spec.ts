import { describe, expect, test } from "vitest";

import { Quantity } from "./quantity";

describe("quantity value object", () => {
    test("add", () => {
        const quantity = Quantity.create(0.1);
        const other = Quantity.create(0.2);

        const result = quantity.add(other);
        expect(result.toNumber()).toBe(0.3);
    });
});
