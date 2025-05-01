// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import type { Static } from '@feathersjs/typebox'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { HookContext } from '../../declarations'
import { Nullable } from '../../utils/nullable'
import { dataValidator, queryValidator } from '../../validators'
import { unitSchema } from '../ingredient/ingredient.schema'
import type { RecipeService } from './recipe.class'

const ingredientSchema = Type.Object({
  id: Type.Number(),
  name: Type.String(),
  quantity: Type.Number(),
  unit: unitSchema,
  description: Nullable(Type.String())
})
type Ingredient = Static<typeof ingredientSchema>

// Main data model schema
export const recipeSchema = Type.Object(
  {
    id: Type.Number(),
    name: Type.String(),
    description: Nullable(Type.String()),
    sourceURL: Nullable(Type.String({ format: 'uri' })),
    picture: Nullable(Type.String({ format: 'uri' })),
    rating: Nullable(Type.Integer({ minimum: 0, maximum: 5 })),
    steps: Nullable(Type.String()),
    ingredients: Type.Array(ingredientSchema)
  },
  { $id: 'Recipe', additionalProperties: false }
)
export type Recipe = Static<typeof recipeSchema>
export const recipeValidator = getValidator(recipeSchema, dataValidator)
export const recipeResolver = resolve<Recipe, HookContext<RecipeService>>({
  ingredients: virtual(async (recipe, context) => {
    // Populate the user associated via `userId`
    const ingredients = await context.app.service('/api/ingredient').find({
      query: { recipeId: recipe.id }
    })

    const ingredientsNoRecipeId: Ingredient[] = ingredients.data.map(i => {
      return {
        ...i,
        recipeId: undefined
      }
    })

    return ingredientsNoRecipeId
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
