import type { Knex } from "knex";

const TABLE_NAME = "products_items";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(TABLE_NAME, (table) => {
        table.increments("id");
        table.string("name").notNullable();
        table.string("description");
        table.integer("brand_id").references("products_brands.id");
        table.string("status", 15).notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(TABLE_NAME);
}
