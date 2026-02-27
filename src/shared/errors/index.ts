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
