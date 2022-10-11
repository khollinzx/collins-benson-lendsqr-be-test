import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('transaction_histories', function (table: Knex.TableBuilder) {
            table.increments('id');
            table.double('amount').defaultTo(0);
            table.integer('user_id').unsigned().nullable();
            table.text('remark');
            table.timestamps(true, true);

            table.foreign('user_id').references('id').inTable('users').onDelete('set null');
        });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTable('transaction_histories');
}

