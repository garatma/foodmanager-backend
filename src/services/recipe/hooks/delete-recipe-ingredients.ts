// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import type { HookContext } from '../../../declarations'
import { RecipeService } from '../recipe.class'

export const deleteRecipeIngredients = async (context: HookContext<RecipeService>) => {
  const id = context.id
  const recipeId = Number(id)

  if (isNaN(recipeId)) return

  await context.app.service('/api/ingredient').remove(null, {
    query: { recipeId }
  })
}
