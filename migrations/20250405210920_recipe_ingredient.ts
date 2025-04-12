// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('recipe_ingredient', table => {
    table.increments('id').primary().notNullable()
    table.integer('recipeId').references('id').inTable('recipe').notNullable()
    table.integer('ingredientId').references('id').inTable('ingredient').notNullable()
    table.integer('quantity').notNullable()
    table.enum('unit', ['ml', 'g', 'un']).notNullable()
    table.string('description').nullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('recipe_ingredient')
}
