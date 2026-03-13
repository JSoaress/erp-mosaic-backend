import { EntityProps } from "@/shared/domain";
import { z } from "@/shared/infra/libs/zod";

export const TableSchema = z.object({
    name: z.string().min(1).max(40),
    number: z.coerce.number().int().nonnegative(),
    seats: z.coerce.number().int().nonnegative().nullish().default(null),
    active: z.coerce.boolean().default(true),
});

export const UpdateTableSchema = TableSchema.partial();

type Schema = typeof TableSchema;

export type TableStatus = "opened" | "reserved" | "closed";

export type TableDTO = EntityProps &
    z.output<Schema> & {
        status: TableStatus;
    };

export type CreateTableDTO = z.input<Schema>;

export type UpdateTableDTO = z.input<typeof UpdateTableSchema>;
