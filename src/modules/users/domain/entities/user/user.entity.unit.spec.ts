import { describe, expect, test } from "vitest";

import { InvalidCredentialsError, InvalidPasswordError, InvalidUserError, ValidationError } from "@/shared/errors";

import { Password, StrongPasswordPolicy } from "./password";
import { CreateUserDTO } from "./user.dto";
import { User } from "./user.entity";

describe("user entity", () => {
    test("should create a new user", async () => {
        const userOrError = await User.create({
            name: "John Doe",
            email: "johndoe@gmail.com",
            password: "123456",
            isAdmin: true,
        });
        expect(userOrError.isRight()).toBeTruthy();
        const user = userOrError.value as User;
        expect(user.isNew).toBeTruthy();
        expect(user.id).toBe(0);
        expect(user.get("name")).toBe("John Doe");
        expect(user.get("email")).toBe("johndoe@gmail.com");
        expect(user.get("password").getValue().startsWith("$2b$12")).toBeTruthy();
        expect(user.get("status")).toBe("created");
        expect(user.get("isAdmin")).toBeTruthy();
    });

    test("should not create a user with invalid properties", async () => {
        const userOrError = await User.create({
            name: "",
            email: "",
            password: "",
            isAdmin: true,
        });
        expect(userOrError.isLeft()).toBeTruthy();
        const validationError = userOrError.value as ValidationError;
        expect(validationError.getError("name")).toEqual(["Muito pequeno: esperado que string tivesse >=1 caracteres"]);
        expect(validationError.getError("email")).toEqual(["endereço de e-mail inválido"]);
        expect(validationError.getError("password")).toEqual([
            "Muito pequeno: esperado que string tivesse >=1 caracteres",
            "Senha não fornecida.",
        ]);
    });

    test("should not create a user with weak password", async () => {
        const passwordPolicy = new StrongPasswordPolicy();
        const input: CreateUserDTO = {
            name: "John Doe",
            email: "johndoe@gmail.com",
            password: "12345",
            isAdmin: true,
        };
        const userOrError = await User.create(input, passwordPolicy);
        expect(userOrError.isLeft()).toBeTruthy();
        const validationError = userOrError.value as ValidationError;
        expect(validationError.getError("password")).toEqual([
            "A senha precisa conter mín. 8 caracteres, 1 maiúscula, 1 minúscula, 1 número, 1 caractere especial e sem espaços.",
        ]);
    });

    test("should activate a created user", () => {
        const user = User.restore({
            id: 10,
            name: "John Doe",
            email: "johndoe@gmail.com",
            password: Password.restore("123456"),
            isAdmin: true,
            status: "created",
        });
        user.activate();
        expect(user.get("status")).toBe("active");
    });

    test("should validate the password of user", async () => {
        const user = User.restore({
            id: 10,
            name: "John Doe",
            email: "johndoe@gmail.com",
            password: Password.restore("$2b$12$WZvwtB17KbHjFFXsBb103.RThlOZPEvZYMifBwZf8uN0FkS.xNUy6"),
            isAdmin: true,
            status: "active",
        });
        const matchOrError = await user.verifyPassword("123456");
        expect(matchOrError.isRight()).toBeTruthy();
    });

    test("should not validate the password if password are wrong", async () => {
        const user = User.restore({
            id: 10,
            name: "John Doe",
            email: "johndoe@gmail.com",
            password: Password.restore("$2b$12$WZvwtB17KbHjFFXsBb103.RThlOZPEvZYMifBwZf8uN0FkS.xNUy6"),
            isAdmin: true,
            status: "active",
        });
        const matchOrError = await user.verifyPassword("12345");
        expect(matchOrError.isLeft()).toBeTruthy();
        expect(matchOrError.value).toBeInstanceOf(InvalidCredentialsError);
    });

    test("should not validate the password if user not are active", async () => {
        const user = User.restore({
            id: 10,
            name: "John Doe",
            email: "johndoe@gmail.com",
            password: Password.restore("$2b$12$WZvwtB17KbHjFFXsBb103.RThlOZPEvZYMifBwZf8uN0FkS.xNUy6"),
            isAdmin: true,
            status: "created",
        });
        const matchOrError = await user.verifyPassword("123456");
        expect(matchOrError.isLeft()).toBeTruthy();
        expect(matchOrError.value).toBeInstanceOf(InvalidUserError);
    });

    test("should update the password", async () => {
        const user = User.restore({
            id: 10,
            name: "John Doe",
            email: "johndoe@gmail.com",
            password: Password.restore("$2b$12$WZvwtB17KbHjFFXsBb103.RThlOZPEvZYMifBwZf8uN0FkS.xNUy6"),
            isAdmin: true,
            status: "active",
        });
        const updateOrError = await user.setPassword("123a456");
        expect(updateOrError.isRight()).toBeTruthy();
        const matchOrError = await user.verifyPassword("123a456");
        expect(matchOrError.isRight()).toBeTruthy();
    });

    test("should not update the password if user not are active", async () => {
        const user = User.restore({
            id: 10,
            name: "John Doe",
            email: "johndoe@gmail.com",
            password: Password.restore("$2b$12$WZvwtB17KbHjFFXsBb103.RThlOZPEvZYMifBwZf8uN0FkS.xNUy6"),
            isAdmin: true,
            status: "created",
        });
        const updateOrError = await user.setPassword("123a456");
        expect(updateOrError.isLeft()).toBeTruthy();
        expect(updateOrError.value).toBeInstanceOf(InvalidUserError);
    });

    test("should not update the password if password are weak", async () => {
        const user = User.restore({
            id: 10,
            name: "John Doe",
            email: "johndoe@gmail.com",
            password: Password.restore("$2b$12$WZvwtB17KbHjFFXsBb103.RThlOZPEvZYMifBwZf8uN0FkS.xNUy6"),
            isAdmin: true,
            status: "active",
        });
        const passwordPolicy = new StrongPasswordPolicy();
        const updateOrError = await user.setPassword("123a456", passwordPolicy);
        expect(updateOrError.isLeft()).toBeTruthy();
        expect(updateOrError.value).toBeInstanceOf(InvalidPasswordError);
    });
});
