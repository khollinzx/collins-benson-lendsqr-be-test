import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('wallets', function (table: Knex.TableBuilder) {
            table.increments('id');
            table.double('balance').defaultTo(0);
            table.double('initial').defaultTo(0);
            table.integer('user_id').unsigned();
            table.timestamps(true, true);

            table.foreign('user_id').references('id').inTable('users').onDelete('cascade');
        });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTable('wallets');
}

