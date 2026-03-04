import { Password, User } from "@/modules/users/domain/entities/user";
import { AbstractMapper, TableFilterConfig } from "@/shared/infra/database";

import { KnexUserDTO } from "../models";

export class UserKnexMapper extends AbstractMapper<User, KnexUserDTO> {
    readonly config: TableFilterConfig<User, KnexUserDTO> = {
        columns: {
            id: { columnName: "id", pk: true },
            name: { columnName: "name" },
            email: { columnName: "email" },
            password: {
                columnName: "password",
                toDomain: (p) => Password.restore(p.password),
                toPersistence: (d) => d.get("password").getValue(),
                blockFilter: true,
            },
            status: { columnName: "status" },
            isAdmin: { columnName: "is_admin" },
        },
    };

    constructor() {
        super(User.restore);
    }
}
