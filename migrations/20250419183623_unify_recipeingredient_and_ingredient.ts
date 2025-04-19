import type { Knex } from 'knex'
import { up as createIngredientTable } from './20250405210103_ingredient'

// these two will wipe your recipe_ingredient and ingredient tables and won't be able to restore them

export async function up(knex: Knex): Promise<void> {
  await knex('recipe_ingredient').delete()
  await knex.schema.alterTable('recipe_ingredient', table => {
    table.string('name').notNullable()
    table.dropColumn('ingredientId')
  })
  await knex.schema.dropTable('ingredient')
  await knex.schema.renameTable('recipe_ingredient', 'ingredient')
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.renameTable('ingredient', 'recipe_ingredient')
  await createIngredientTable(knex)
  await knex.schema.alterTable('recipe_ingredient', table => {
    table.dropColumn('name')
    table.integer('ingredientId').references('id').inTable('ingredient').notNullable()
  })
}
