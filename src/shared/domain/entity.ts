import { Either } from "ts-arch-kit/dist/core/helpers";
import { AbstractModel, AbstractModelProps, PrimaryKey } from "ts-arch-kit/dist/core/models";

import { MosaicError } from "../errors";
import { z } from "../libs/zod";

export type EntityProps = Required<AbstractModelProps>;

export abstract class Entity<T extends EntityProps> extends AbstractModel<T> {
    protected constructor(props: T, idGenerator: () => PrimaryKey = () => 0) {
        super(props, !props.id, idGenerator);
    }

    getId(): number {
        return this.id as number;
    }

    toDto(): T {
        return { ...this.props };
    }

    abstract getSchema(): z.ZodObject;

    abstract update(input: unknown): Either<MosaicError, void>;

    protected updateProps(input: Partial<T>) {
        Object.entries(input).forEach(([field, value]) => {
            this.props[field as keyof T] = value;
        });
    }
}
