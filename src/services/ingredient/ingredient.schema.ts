// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import type { Static } from '@feathersjs/typebox'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { HookContext } from '../../declarations'
import { Nullable } from '../../utils/nullable'
import { dataValidator, queryValidator } from '../../validators'
import type { IngredientService } from './ingredient.class'

export const unitSchema = Type.Union([Type.Literal('ml'), Type.Literal('g'), Type.Literal('un')])

// Main data model schema
export const ingredientSchema = Type.Object(
  {
    id: Type.Number(),
    name: Type.String(),
    recipeId: Type.Number(),
    quantity: Type.Number(),
    unit: unitSchema,
    description: Nullable(Type.String())
  },
  { $id: 'Ingredient', additionalProperties: false }
)
export type Ingredient = Static<typeof ingredientSchema>
export const ingredientValidator = getValidator(ingredientSchema, dataValidator)
export const ingredientResolver = resolve<Ingredient, HookContext<IngredientService>>({})

export const ingredientExternalResolver = resolve<Ingredient, HookContext<IngredientService>>({})

// Schema for creating new entries
export const ingredientDataSchema = Type.Omit(ingredientSchema, ['id'], {
  $id: 'IngredientData'
})
export type IngredientData = Static<typeof ingredientDataSchema>
export const ingredientDataValidator = getValidator(ingredientDataSchema, dataValidator)
export const ingredientDataResolver = resolve<Ingredient, HookContext<IngredientService>>({})

// Schema for updating existing entries
export const ingredientPatchSchema = Type.Partial(ingredientSchema, {
  $id: 'IngredientPatch'
})
export type IngredientPatch = Static<typeof ingredientPatchSchema>
export const ingredientPatchValidator = getValidator(ingredientPatchSchema, dataValidator)
export const ingredientPatchResolver = resolve<Ingredient, HookContext<IngredientService>>({})

// Schema for allowed query properties
export const ingredientQueryProperties = ingredientSchema
export const ingredientQuerySchema = Type.Intersect(
  [
    querySyntax(ingredientQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type IngredientQuery = Static<typeof ingredientQuerySchema>
export const ingredientQueryValidator = getValidator(ingredientQuerySchema, queryValidator)
export const ingredientQueryResolver = resolve<IngredientQuery, HookContext<IngredientService>>({})
