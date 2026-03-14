import type { Knex } from "knex";

const TABLE_ORDERS = "restaurant_orders";
const TABLE_ORDER_ITEMS = "restaurant_order_items";
const TABLE_ORDER_STATUS_HISTORICAL = "restaurant_order_status_historical";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(TABLE_ORDERS, (table) => {
        table.increments("id");
        table.integer("table_id").notNullable().references("restaurant_tables.id");
        table.string("status").notNullable();
        table.integer("total").notNullable().defaultTo(0);
    });

    await knex.schema.createTable(TABLE_ORDER_ITEMS, (table) => {
        table.increments("id");
        table.integer("order_id").notNullable().references(`${TABLE_ORDERS}.id`);
        table.integer("item").notNullable();
        table.integer("sku_id").notNullable().references("products_skus.id");
        table.decimal("quantity", 12, 4).notNullable();
        table.integer("unit_price").notNullable().defaultTo(0);
        table.string("notes");
        table.string("status").notNullable();
        table.integer("created_by").notNullable().references("users_users.id");
        table.datetime("created_at").notNullable();
        table.unique(["order_id", "item"]);
    });

    await knex.schema.createTable(TABLE_ORDER_STATUS_HISTORICAL, (table) => {
        table.increments("id");
        table.integer("order_id").notNullable().references(`${TABLE_ORDERS}.id`);
        table.string("status").notNullable();
        table.integer("changed_by").notNullable().references("users_users.id");
        table.datetime("created_at").notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(TABLE_ORDERS);
    await knex.schema.dropTable(TABLE_ORDER_ITEMS);
    await knex.schema.dropTable(TABLE_ORDER_STATUS_HISTORICAL);
}
