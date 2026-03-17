import { UserStatus } from "@/modules/users/domain/entities/user";
import { KnexModel } from "@/core/infra/database/knex/models";

export type KnexUserDTO = KnexModel & {
    name: string;
    email: string;
    password: string;
    status: UserStatus;
    is_admin: boolean;
};
