import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('recipe', table => {
    table.dropColumn('pictureURL')
    table.specificType('picture', 'varchar').nullable
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('recipe', table => {
    table.dropColumn('picture')
    table.string('pictureURL').nullable()
  })
}
