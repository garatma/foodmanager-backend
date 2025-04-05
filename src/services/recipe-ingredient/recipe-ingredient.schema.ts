// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import type { Static } from '@feathersjs/typebox'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { RecipeIngredientService } from './recipe-ingredient.class'

// Main data model schema
export const recipeIngredientSchema = Type.Object(
  {
    id: Type.Number(),
    recipeId: Type.Number(),
    ingredientId: Type.Number(),
    unit: Type.Union([Type.Literal('ml'), Type.Literal('g'), Type.Literal('un')]),
    description: Type.Optional(Type.String())
  },
  { $id: 'RecipeIngredient', additionalProperties: false }
)
export type RecipeIngredient = Static<typeof recipeIngredientSchema>
export const recipeIngredientValidator = getValidator(recipeIngredientSchema, dataValidator)
export const recipeIngredientResolver = resolve<RecipeIngredient, HookContext<RecipeIngredientService>>({})

export const recipeIngredientExternalResolver = resolve<
  RecipeIngredient,
  HookContext<RecipeIngredientService>
>({})

// Schema for creating new entries
export const recipeIngredientDataSchema = Type.Omit(recipeIngredientSchema, ['id'], {
  $id: 'RecipeIngredientData'
})
export type RecipeIngredientData = Static<typeof recipeIngredientDataSchema>
export const recipeIngredientDataValidator = getValidator(recipeIngredientDataSchema, dataValidator)
export const recipeIngredientDataResolver = resolve<RecipeIngredient, HookContext<RecipeIngredientService>>(
  {}
)

// Schema for updating existing entries
export const recipeIngredientPatchSchema = Type.Partial(recipeIngredientSchema, {
  $id: 'RecipeIngredientPatch'
})
export type RecipeIngredientPatch = Static<typeof recipeIngredientPatchSchema>
export const recipeIngredientPatchValidator = getValidator(recipeIngredientPatchSchema, dataValidator)
export const recipeIngredientPatchResolver = resolve<RecipeIngredient, HookContext<RecipeIngredientService>>(
  {}
)

// Schema for allowed query properties
export const recipeIngredientQueryProperties = recipeIngredientSchema
export const recipeIngredientQuerySchema = Type.Intersect(
  [
    querySyntax(recipeIngredientQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type RecipeIngredientQuery = Static<typeof recipeIngredientQuerySchema>
export const recipeIngredientQueryValidator = getValidator(recipeIngredientQuerySchema, queryValidator)
export const recipeIngredientQueryResolver = resolve<
  RecipeIngredientQuery,
  HookContext<RecipeIngredientService>
>({})
