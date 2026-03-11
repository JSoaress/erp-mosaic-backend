import { describe, expect, test } from "vitest";

import { Money } from "./money";

describe("money value object", () => {
    test("should create an money from cents", () => {
        const money = Money.fromCents(1001);
        expect(money.cents).toBe(1001);
        expect(money.toFloat()).toBe(10.01);
        expect(money.format()).toBe("R$ 10,01");
    });

    test("should create an money from float", () => {
        const money = Money.fromFloat(23.87);
        expect(money.cents).toBe(2387);
        expect(money.toFloat()).toBe(23.87);
        expect(money.format()).toBe("R$ 23,87");
    });

    test("should sum two money's", () => {
        const money = Money.fromCents(5087);
        const other = Money.fromFloat(47.69);
        const result = money.add(other);
        expect(result.toFloat()).toBe(98.56);
    });

    test("should correctly handle floating point precision", () => {
        const money = Money.fromFloat(0.1 + 0.2);
        expect(money.cents).toBe(30);
        expect(money.toFloat()).toBe(0.3);
    });

    test("should round correctly when creating from float", () => {
        const money = Money.fromFloat(10.019);
        expect(money.cents).toBe(1002);
    });

    test("should round half up correctly", () => {
        const money = Money.fromFloat(10.015);
        expect(money.cents).toBe(1002);
    });

    test("should sum negative values", () => {
        const a = Money.fromFloat(50);
        const b = Money.fromFloat(-10);
        const result = a.add(b);
        expect(result.toFloat()).toBe(40);
    });

    test("should result zero when summing opposite values", () => {
        const a = Money.fromFloat(10);
        const b = Money.fromFloat(-10);
        const result = a.add(b);
        expect(result.cents).toBe(0);
    });

    test("should not mutate original money when adding", () => {
        const a = Money.fromFloat(10);
        const b = Money.fromFloat(5);
        const result = a.add(b);
        expect(a.toFloat()).toBe(10);
        expect(b.toFloat()).toBe(5);
        expect(result.toFloat()).toBe(15);
    });

    test("should correctly sum many small values", () => {
        let total = Money.fromCents(0);

        for (let i = 0; i < 100; i += 1) {
            total = total.add(Money.fromFloat(0.01));
        }

        expect(total.toFloat()).toBe(1);
    });

    test("should support large monetary values", () => {
        const money = Money.fromFloat(999999999.99);
        expect(money.cents).toBe(99999999999);
    });

    test("should format negative values correctly", () => {
        const money = Money.fromFloat(-10.5);
        expect(money.format()).toBe("-R$ 10,50");
    });

    test("cents should always be integer", () => {
        const money = Money.fromFloat(10.23);
        expect(Number.isInteger(money.cents)).toBe(true);
    });

    test("should not accumulate floating errors", () => {
        const a = Money.fromFloat(0.1);
        const b = Money.fromFloat(0.2);
        const result = a.add(b);
        expect(result.toFloat()).toBe(0.3);
    });

    test("should maintain cent precision after multiple operations", () => {
        const a = Money.fromFloat(19.99);
        const b = Money.fromFloat(5.55);
        const c = Money.fromFloat(3.46);
        const result = a.add(b).add(c);
        expect(result.cents).toBe(2900);
    });
});
