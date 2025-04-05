// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('recipe', table => {
    table.increments('id').notNullable().primary()
    table.string('name').notNullable()
    table.string('description').nullable()
    table.string('sourceURL').nullable()
    table.string('pictureURL').nullable()
    table.integer('rating').nullable()
    table.string('steps').nullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('recipe')
}
