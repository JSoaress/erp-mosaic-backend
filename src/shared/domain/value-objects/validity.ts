export class Validity {
    constructor(
        private initialDate: Date,
        private endDate?: Nullable<Date>,
    ) {}

    isActive(date = new Date()): boolean {
        if (!this.endDate) return date >= this.initialDate;
        return date >= this.initialDate && date <= this.endDate;
    }
}
