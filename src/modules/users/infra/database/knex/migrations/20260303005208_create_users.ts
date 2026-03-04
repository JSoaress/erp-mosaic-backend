import type { Knex } from "knex";

const TABLE_NAME = "users_users";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(TABLE_NAME, (table) => {
        table.increments("id");
        table.string("name").notNullable();
        table.string("email").notNullable().unique();
        table.string("password").notNullable();
        table.string("status").notNullable();
        table.boolean("is_admin").notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(TABLE_NAME);
}
