import { Either, left, right } from "ts-arch-kit/dist/core/helpers";

import { Entity, Tenant } from "@/shared/domain";
import { ValidationError } from "@/shared/errors";
import { ZodValidator } from "@/shared/libs/zod";

import { CreateSubscriberDTO, RestoreSubscriberDTO, SubscriberDTO, SubscriberSchema } from "./subscriber.dto";

export class Subscriber extends Entity<SubscriberDTO> {
    static create(props: CreateSubscriberDTO): Either<ValidationError, Subscriber> {
        const validDataOrError = ZodValidator.validate(props, SubscriberSchema);
        if (!validDataOrError.success) return left(new ValidationError(Subscriber.name, validDataOrError.errors));
        return right(new Subscriber({ ...validDataOrError.data, id: 0, startedAt: new Date(), endAt: null, active: false }));
    }

    static restore(props: RestoreSubscriberDTO) {
        return new Subscriber(props);
    }

    getSchema() {
        return SubscriberSchema;
    }

    update(input: unknown): Either<ValidationError, void> {
        throw new Error("Method not implemented.");
    }

    addModule(module: string) {
        this.props.enabledModules = Array.from(new Set([...this.props.enabledModules, module]));
    }

    getTenant(): Tenant {
        return Tenant.restore(this.props.document, this.props.startedAt);
    }
}
