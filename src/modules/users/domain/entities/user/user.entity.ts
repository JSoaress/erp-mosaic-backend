import { Either, left, right } from "ts-arch-kit/dist/core/helpers";

import { Entity } from "@/shared/domain";
import {
    InvalidCredentialsError,
    InvalidPasswordError,
    InvalidTokenError,
    InvalidUserError,
    MosaicError,
    ValidationError,
} from "@/shared/errors";
import { ZodValidator } from "@/shared/infra/libs/zod";

import { IPasswordPolicy, Password } from "./password";
import { CreateUserDTO, RestoreUserDTO, UserDTO, UserSchema } from "./user.dto";

export class User extends Entity<UserDTO> {
    static async create(props: CreateUserDTO, passwordPolicy?: IPasswordPolicy): Promise<Either<ValidationError, User>> {
        const validDataOrError = ZodValidator.validate(props, UserSchema);
        const passwordOrError = await Password.create(`${props.password}`, { policy: passwordPolicy });
        let password: Password | null = null;
        if (!validDataOrError.success || passwordOrError.isLeft()) {
            const validationError = new ValidationError(User.name, {});
            if (!validDataOrError.success) validationError.setErrors(validDataOrError.errors);
            if (passwordOrError.isLeft()) validationError.setError("password", passwordOrError.value.message);
            return left(validationError);
        }
        if (!password) {
            if (passwordOrError.isLeft())
                return left(new ValidationError(User.name, { password: [passwordOrError.value.message] }));
            password = passwordOrError.value;
        }
        return right(new User({ ...validDataOrError.data, id: 0, password, status: "created" }));
    }

    static restore(props: RestoreUserDTO) {
        return new User(props);
    }

    getSchema() {
        return UserSchema;
    }

    update(): Either<MosaicError, void> {
        throw new Error("Method not implemented.");
    }

    isActive() {
        return this.props.status === "active";
    }

    async verifyPassword(plainPassword: string): Promise<Either<InvalidUserError | InvalidCredentialsError, true>> {
        if (!this.isActive()) return left(new InvalidUserError());
        const matchPassword = await this.props.password.verify(plainPassword);
        if (!matchPassword) return left(new InvalidCredentialsError());
        return right(true);
    }

    async setPassword(
        plainPassword: string,
        passwordPolicy?: IPasswordPolicy,
    ): Promise<Either<InvalidUserError | InvalidPasswordError, void>> {
        if (!this.isActive()) return left(new InvalidUserError());
        const passwordOrError = await Password.create(plainPassword, { policy: passwordPolicy });
        if (passwordOrError.isLeft()) return left(passwordOrError.value);
        this.props.password = passwordOrError.value;
        return right(undefined);
    }

    activate(): Either<InvalidTokenError, void> {
        this.props.status = "active";
        return right(undefined);
    }
}
