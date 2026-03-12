import { EntityProps, Money } from "@/shared/domain";
import { foreignKey, z } from "@/shared/infra/libs/zod";

const BaseSchema = z.object({
    skuId: foreignKey("Sku"),
    price: z.coerce
        .number()
        .int()
        .positive({ error: "O valor deve ser maior que 0." })
        .transform((v) => Money.fromCents(v)),
    validFrom: z.coerce
        .date()
        .default(() => new Date())
        .refine((d) => d >= new Date(), { error: "Deve ser maior ou igual a data atual." }),
    validTo: z.coerce.date().nullish().default(null),
    main: z.coerce.boolean().default(false),
    active: z.coerce.boolean().default(true),
});

export const SkuPriceSchema = BaseSchema.refine((data) => !data.validTo || data.validTo >= data.validFrom, {
    error: 'Data inválida: Deve ser maior que "validFrom".',
    path: ["validTo"],
});

export const UpdateSkuPriceSchema = BaseSchema.omit({ skuId: true }).partial();

type Schema = typeof SkuPriceSchema;

export type SkuPriceDTO = EntityProps & z.output<Schema>;

export type CreateSkuPriceDTO = z.input<Schema>;

export type UpdateSkuPriceDTO = z.input<typeof UpdateSkuPriceSchema>;
