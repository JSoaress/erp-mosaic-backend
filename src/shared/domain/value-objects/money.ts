import { dinero, Dinero, add, subtract, multiply, toDecimal } from "dinero.js";
import { BRL } from "dinero.js/currencies";

export class Money {
    private constructor(private readonly value: Dinero<number, "BRL">) {}

    static fromCents(cents: number) {
        return new Money(dinero({ amount: cents, currency: BRL }));
    }

    static fromFloat(value: number) {
        return new Money(dinero({ amount: Math.round(value * 100), currency: BRL }));
    }

    add(other: Money): Money {
        return new Money(add(this.value, other.value));
    }

    subtract(other: Money): Money {
        return new Money(subtract(this.value, other.value));
    }

    multiply(multiplier: number): Money {
        return new Money(multiply(this.value, multiplier));
    }

    get cents(): number {
        const { amount } = this.value.toJSON();
        return amount;
    }

    toFloat(): number {
        return Number(toDecimal(this.value));
    }

    format(): string {
        return Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })
            .format(this.toFloat())
            .replace(/\u00A0/g, " ");
    }
}
