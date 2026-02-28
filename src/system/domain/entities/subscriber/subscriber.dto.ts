import { EntityProps } from "@/shared/domain";
import { z } from "@/shared/infra/libs/zod";

export const SubscriberSchema = z.object({
    name: z.preprocess((e: string) => e.trim(), z.string().min(1).max(50)),
    document: z.string().min(1),
});

type Schema = typeof SubscriberSchema;

export type SubscriberDTO = EntityProps &
    z.output<Schema> & {
        startedAt: Date;
        endAt: Nullable<Date>;
        active: boolean;
    };

export type CreateSubscriberDTO = Pick<SubscriberDTO, "name" | "document">;

export type RestoreSubscriberDTO = SubscriberDTO;
