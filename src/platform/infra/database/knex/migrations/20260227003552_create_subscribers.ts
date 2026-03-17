import type { Knex } from "knex";

const TABLE_NAME = "subscribers";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(TABLE_NAME, (table) => {
        table.increments("id");
        table.timestamps(true, true);
        table.string("name").notNullable();
        table.string("document").notNullable().unique();
        table.datetime("started_at");
        table.datetime("end_at");
        table.boolean("is_active").notNullable().defaultTo(false);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(TABLE_NAME);
}
