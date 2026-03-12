import type { Knex } from "knex";

const TABLE_NAME = "products_sku_prices";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(TABLE_NAME, (table) => {
        table.increments("id");
        table.integer("sku_id").notNullable().references("products_skus.id").index();
        table.integer("price").notNullable();
        table.datetime("valid_from").notNullable();
        table.datetime("valid_to");
        table.boolean("main").notNullable().defaultTo(false);
        table.boolean("active").notNullable().defaultTo(true);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(TABLE_NAME);
}
