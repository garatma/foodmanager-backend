// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'
import { ingredient } from './ingredient/ingredient'
import { recipeIngredient } from './recipe-ingredient/recipe-ingredient'
import { recipe } from './recipe/recipe'

export const services = (app: Application) => {
  // All services will be registered here
  app.configure(ingredient)
  app.configure(recipe)
  app.configure(recipeIngredient)
}
