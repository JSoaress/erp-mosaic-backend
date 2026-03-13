import type { Knex } from "knex";

const TABLE_NAME = "restaurant_tables";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(TABLE_NAME, (table) => {
        table.increments("id");
        table.string("name").notNullable();
        table.integer("number").notNullable();
        table.integer("seats");
        table.string("status").notNullable();
        table.boolean("active").notNullable().defaultTo(true);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(TABLE_NAME);
}
