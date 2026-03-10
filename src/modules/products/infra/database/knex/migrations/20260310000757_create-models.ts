import type { Knex } from "knex";

const TABLE_NAME = "products_models";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(TABLE_NAME, (table) => {
        table.increments("id");
        table.string("name").notNullable();
        table.integer("brand_id").notNullable().references("products_brands.id");
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(TABLE_NAME);
}
