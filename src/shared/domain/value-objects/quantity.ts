import Decimal from "decimal.js";

export class Quantity {
    constructor(private value: Decimal) {}

    static create(value: string | number) {
        return new Quantity(new Decimal(value));
    }

    add(other: Quantity) {
        return new Quantity(this.value.add(other.value));
    }

    toNumber() {
        return this.value.toNumber();
    }
}
