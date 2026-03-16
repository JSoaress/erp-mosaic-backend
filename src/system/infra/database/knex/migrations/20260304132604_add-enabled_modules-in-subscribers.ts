import type { Knex } from "knex";

const TABLE_NAME = "subscribers";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable(TABLE_NAME, (table) => {
        table.string("enabled_modules").notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable(TABLE_NAME, (table) => {
        table.dropColumn("enabled_modules");
    });
}
