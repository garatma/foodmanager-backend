// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import type { Static } from '@feathersjs/typebox'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import { unitSchema } from '../recipe-ingredient/recipe-ingredient.schema'
import type { RecipeService } from './recipe.class'

const ingredientSchema = Type.Object({
  id: Type.Number(),
  name: Type.String(),
  quantity: Type.Number(),
  unit: unitSchema,
  description: Type.Optional(Type.String())
})
type Ingredient = Static<typeof ingredientSchema>

// Main data model schema
export const recipeSchema = Type.Object(
  {
    id: Type.Number(),
    name: Type.String(),
    description: Type.Optional(Type.String()),
    sourceURL: Type.Optional(Type.String({ format: 'uri' })),
    pictureURL: Type.Optional(Type.String({ format: 'uri' })),
    rating: Type.Optional(Type.Integer({ minimum: 0, maximum: 5 })),
    steps: Type.Optional(Type.String()),
    ingredients: Type.Array(ingredientSchema)
  },
  { $id: 'Recipe', additionalProperties: false }
)
export type Recipe = Static<typeof recipeSchema>
export const recipeValidator = getValidator(recipeSchema, dataValidator)
export const recipeResolver = resolve<Recipe, HookContext<RecipeService>>({
  ingredients: virtual(async (recipe, context) => {
    // Populate the user associated via `userId`
    const recipeIngredients = await context.app.service('/api/recipe-ingredient').find({
      query: { recipeId: recipe.id }
    })

    const ingredientIds = [...new Set(recipeIngredients.data.map(ri => ri.ingredientId))]

    const ingredients = await context.app.service('/api/ingredient').find({
      query: { id: { $in: ingredientIds } }
    })

    const ingredientsWithRi: Ingredient[] = recipeIngredients.data.map(ri => {
      // we can cast it to the type because we know it exists
      const ingredient = ingredients.data.find(i => ri.ingredientId === i.id)!
      return {
        id: ingredient.id,
        name: ingredient.name,
        quantity: ri.quantity,
        unit: ri.unit,
        description: ri.description
      }
    })

    return ingredientsWithRi
  })
})

export const recipeExternalResolver = resolve<Recipe, HookContext<RecipeService>>({})

// Schema for creating new entries
export const recipeDataSchema = Type.Omit(recipeSchema, ['id', 'ingredients'], {
  $id: 'RecipeData'
})
export type RecipeData = Static<typeof recipeDataSchema>
export const recipeDataValidator = getValidator(recipeDataSchema, dataValidator)
export const recipeDataResolver = resolve<Recipe, HookContext<RecipeService>>({})

// Schema for updating existing entries
export const recipePatchSchema = Type.Partial(Type.Omit(recipeSchema, ['ingredients']), {
  $id: 'RecipePatch'
})
export type RecipePatch = Static<typeof recipePatchSchema>
export const recipePatchValidator = getValidator(recipePatchSchema, dataValidator)
export const recipePatchResolver = resolve<Recipe, HookContext<RecipeService>>({})

// Schema for allowed query properties
export const recipeQueryProperties = Type.Omit(recipeSchema, ['ingredients'], {
  $id: 'RecipeQuery'
})
export const recipeQuerySchema = Type.Intersect(
  [
    querySyntax(recipeQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type RecipeQuery = Static<typeof recipeQuerySchema>
export const recipeQueryValidator = getValidator(recipeQuerySchema, queryValidator)
export const recipeQueryResolver = resolve<RecipeQuery, HookContext<RecipeService>>({})
