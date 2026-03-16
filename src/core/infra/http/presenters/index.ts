/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPresenter } from "ts-arch-kit/dist/core/helpers";

import { Entity } from "@/shared/domain";

export class EntityJsonPresenter implements IPresenter<Entity<any>, Record<string, unknown>> {
    present(input: Entity<any>): Record<string, unknown> {
        return input.toDto();
    }
}
