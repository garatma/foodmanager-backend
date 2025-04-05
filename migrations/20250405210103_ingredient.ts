// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('ingredient', table => {
    table.increments('id').primary().notNullable()
    table.string('name').unique().notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('ingredient')
}
