/* eslint-disable no-continue */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Either, left, right } from "ts-arch-kit/dist/core/helpers";
import { IExists, ISetUnitOfWork, UnitOfWork } from "ts-arch-kit/dist/database";

import { IBaseRepositoryFactory } from "@/shared/database";
import { Entity } from "@/shared/domain";
import { NotFoundModelError } from "@/shared/errors";

export class ForeignKeyValidationService {
    async validate(
        uow: UnitOfWork,
        repositoryFactory: IBaseRepositoryFactory,
        data: Entity<any>,
    ): Promise<Either<NotFoundModelError, void>> {
        const { shape } = data.getSchema();
        // eslint-disable-next-line no-restricted-syntax
        for (const key in shape) {
            if (!Object.hasOwn(shape, key)) continue;
            const field = shape[key];
            const { description } = field;
            if (!description || !description.startsWith("fk:")) continue;
            const [, entity] = description.split(":") as string[];
            const value = data.toDto()[key];
            if (value === undefined || value === null || (!data.isNew && !data.checkDirtyProps(key))) continue;
            const [first, ...rest] = entity.split("");
            const entityName = `${first.toUpperCase()}${rest.join("")}`;
            const repo = (repositoryFactory as any)[`create${entityName}Repository`]() as ISetUnitOfWork & IExists;
            uow.prepare(repo);
            // eslint-disable-next-line no-await-in-loop
            const exists = await repo.exists({ id: value });
            if (!exists) return left(new NotFoundModelError(entityName, value));
        }
        return right(undefined);
    }
}
