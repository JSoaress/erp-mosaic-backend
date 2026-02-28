import { Either, left, right } from "ts-arch-kit/dist/core/helpers";

import { ValidationError } from "@/shared/errors";
import { z, ZodValidator } from "@/shared/infra/libs/zod";

function toPostgresSchemaName(input: string): string {
    return input
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "");
}

const TenantSchema = z.object({
    name: z.string().min(1).transform(toPostgresSchemaName),
    createdAt: z.coerce.date().refine((d) => d <= new Date(), { error: "Deve ser menor ou igual a data atual." }),
});

export class Tenant {
    private constructor(
        private name: string,
        private createdAt: Date,
    ) {}

    static create(name: string, createdAt: Date): Either<ValidationError, Tenant> {
        const validDataOrError = ZodValidator.validate({ name, createdAt }, TenantSchema);
        if (!validDataOrError.success) return left(new ValidationError(Tenant.name, validDataOrError.errors));
        const { name: validName } = validDataOrError.data;
        return right(new Tenant(validName, createdAt));
    }

    static restore(name: string, createdAt: Date) {
        return new Tenant(name, createdAt);
    }

    getName() {
        return `tenant_${this.name}`;
    }

    getCreatedAt() {
        return this.createdAt;
    }
}
