import type { Knex } from "knex";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
    development: {
        client: "pg",
        connection: {
            // host: process.env.DATABASE_HOST,
            host: "localhost",
            // port: Number(process.env.DATABASE_PORT),
            port: 5432,
            // database: process.env.DATABASE_DB,
            database: "mosaic",
            // user: process.env.DATABASE_USER,
            user: "postgres",
            // password: process.env.DATABASE_PASSWORD,
            password: "postgres",
        },
        pool: {
            min: 2,
            max: 10,
            idleTimeoutMillis: 10000,
            afterCreate: (conn, done) => {
                conn.query("SET timezone='America/Sao_Paulo'", (err) => {
                    done(err, conn);
                });
            },
        },
        migrations: {
            extension: "ts",
            stub: "migration.stub",
            tableName: "knex_migrations",
        },
    },
};

export default config;
