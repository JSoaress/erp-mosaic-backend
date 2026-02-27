import { AbstractModel, AbstractModelProps, PrimaryKey } from "ts-arch-kit/dist/core/models";

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
}
