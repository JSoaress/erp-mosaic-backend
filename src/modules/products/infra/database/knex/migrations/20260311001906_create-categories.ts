import type { Knex } from "knex";

const TABLE_NAME = "products_categories";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(TABLE_NAME, (table) => {
        table.increments("id");
        table.string("name").notNullable();
        table.string("type", 10).notNullable();
        table.integer("parent_id").references("products_categories.id");
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(TABLE_NAME);
}
