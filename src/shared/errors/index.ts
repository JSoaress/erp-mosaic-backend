/* eslint-disable max-classes-per-file */
import { BasicError } from "ts-arch-kit/dist/core/errors";

export abstract class MosaicError extends BasicError {}

export class UnknownError extends MosaicError {
    constructor(error: unknown) {
        const message = ["Erro desconhecido."];
        let isOperational = true;
        if (error instanceof Error) {
            isOperational = false;
            message.push("MOTIVO:", error.message);
        }
        super(message.join(" "), isOperational);
    }
}

export class ValidationError extends MosaicError {
    constructor(
        model: string,
        private errors: Record<string, string[]>,
    ) {
        super(`Erro de validação em "${model}"`, true);
    }

    getError(prop: string): string[] | null {
        return this.errors[prop] || null;
    }

    setError(key: string, ...errors: string[]) {
        if (this.errors[key]) this.errors[key].push(...errors);
        else this.errors[key] = errors;
    }

    getErrors() {
        return this.errors;
    }

    setErrors(errors: Record<string, string[]>) {
        this.errors = errors;
    }

    hasErrors() {
        return Object.keys(this.errors).length > 0;
    }

    toJSON(): Record<string, unknown> {
        return {
            ...super.toJSON(),
            errors: this.errors,
        };
    }
}

export class InvalidPasswordError extends MosaicError {
    constructor(message: string) {
        super(message, true);
    }
}

export class InvalidUserError extends MosaicError {
    constructor() {
        super("O usuário está inválido", true);
    }
}

export class InvalidCredentialsError extends MosaicError {
    constructor() {
        super("Credenciais inválidas.", true);
    }
}

export class InvalidTokenError extends MosaicError {
    constructor(message = "Token inválido.") {
        super(message, true);
    }
}

export class EmailTakenError extends MosaicError {
    constructor(email: string) {
        super(`O email "${email}" já está em uso por outro usuário.`, true);
    }
}

export class NotFoundModelError extends MosaicError {
    constructor(
        model: string,
        readonly pk: unknown,
    ) {
        super(`O objeto do tipo "${model}" não foi encontrado.`, true);
    }

    toJSON(): Record<string, unknown> {
        return {
            ...super.toJSON(),
            pk: this.pk,
        };
    }
}

export class TenantIdNotProvidedError extends MosaicError {
    constructor() {
        super("O 'tenantId' não foi fornecido.", true);
    }
}

export class SkuCodeTakenError extends MosaicError {
    constructor(code: string) {
        super(`O código de SKU "${code}" já está em uso.`, true);
    }
}

export class InvalidSkuCategory extends MosaicError {
    constructor(type: string) {
        super(`O tipo de categoria "${type}" não pode ser atribuído ao SKU."`, true);
    }
}

export class OpenOrderError extends MosaicError {
    constructor(reason: string) {
        super(`Não foi possível abrir o pedido. MOTIVO: ${reason}`, true);
    }
}

export class TableIsNotCloseError extends MosaicError {
    constructor() {
        super("A mesa não está fechada.", true);
    }
}

export class AddOrderItemError extends MosaicError {
    constructor(orderId: number) {
        super(`Não foi possível adicionar o produto no pedido nº ${orderId}.`, true);
    }
}

export class AddOrderItemValidationError extends AddOrderItemError {
    constructor(
        orderId: number,
        private validationError: ValidationError,
    ) {
        super(orderId);
    }

    toJSON(): Record<string, unknown> {
        return {
            ...super.toJSON(),
            reason: this.validationError.message,
            errors: this.validationError.getErrors(),
        };
    }
}

export class AddOrderItemConflictError extends AddOrderItemError {
    constructor(
        orderId: number,
        private reason: string,
    ) {
        super(orderId);
    }

    toJSON(): Record<string, unknown> {
        return {
            ...super.toJSON(),
            reason: this.reason,
        };
    }
}

export class CancelOrderItemError extends MosaicError {
    constructor(orderId: number, reason?: string) {
        const chunks = [`Não foi possível cancelar o item no pedido nº ${orderId}.`];
        if (reason) chunks.push("MOTIVO:", reason);
        super(chunks.join(" "), true);
    }
}
