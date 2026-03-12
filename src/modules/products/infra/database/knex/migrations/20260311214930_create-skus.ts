import type { Knex } from "knex";

const TABLE_NAME = "products_skus";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(TABLE_NAME, (table) => {
        table.increments("id");
        table.integer("item_id").notNullable().references("products_items.id");
        table.string("code", 20).notNullable().unique();
        table.string("description").notNullable();
        table.string("short_description");
        table.string("characteristics");
        table.decimal("gross_weight", 12, 4).notNullable().defaultTo(0);
        table.decimal("net_weight", 12, 4).notNullable().defaultTo(0);
        table.integer("volumes").notNullable().defaultTo(0);
        table.integer("model_id").references("products_models.id");
        table.integer("category_id").references("products_categories.id");
        table.string("obs");
        table.boolean("active").notNullable().defaultTo(true);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(TABLE_NAME);
}
