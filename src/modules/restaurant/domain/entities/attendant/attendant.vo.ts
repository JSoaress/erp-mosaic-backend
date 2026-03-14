import { AuthenticatedUser } from "@/modules/users/domain/entities/auth";
import { User } from "@/modules/users/domain/entities/user";

export class Attendant {
    constructor(private attendant: User | AuthenticatedUser) {}

    getId() {
        if (this.attendant instanceof User) return this.attendant.getId();
        return this.attendant.id as number;
    }
}
