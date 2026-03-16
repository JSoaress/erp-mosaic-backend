import { EntityProps } from "@/shared/domain";
import { z } from "@/shared/libs/zod";

import { Password } from "./password";

export const UserSchema = z.object({
    name: z.string().min(1),
    email: z.email(),
    password: z.string().min(1),
    isAdmin: z.coerce.boolean(),
});

type Schema = typeof UserSchema;

export type UserStatus = "created" | "active" | "blocked";

export type UserDTO = EntityProps &
    Pick<z.output<Schema>, "name" | "email" | "isAdmin"> & {
        password: Password;
        status: UserStatus;
    };

export type CreateUserDTO = z.input<Schema>;

export type RestoreUserDTO = UserDTO;
