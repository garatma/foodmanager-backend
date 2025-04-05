// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import type { Static } from '@feathersjs/typebox'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { RecipeService } from './recipe.class'

// Main data model schema
export const recipeSchema = Type.Object(
  {
    id: Type.Number(),
    name: Type.String(),
    description: Type.Optional(Type.String()),
    sourceURL: Type.Optional(Type.String({ format: 'uri' })),
    pictureURL: Type.Optional(Type.String({ format: 'uri' })),
    rating: Type.Optional(Type.Integer({ minimum: 0, maximum: 5 })),
    steps: Type.Optional(Type.String())
  },
  { $id: 'Recipe', additionalProperties: false }
)
export type Recipe = Static<typeof recipeSchema>
export const recipeValidator = getValidator(recipeSchema, dataValidator)
export const recipeResolver = resolve<Recipe, HookContext<RecipeService>>({})

export const recipeExternalResolver = resolve<Recipe, HookContext<RecipeService>>({})

// Schema for creating new entries
export const recipeDataSchema = Type.Omit(recipeSchema, ['id'], {
  $id: 'RecipeData'
})
export type RecipeData = Static<typeof recipeDataSchema>
export const recipeDataValidator = getValidator(recipeDataSchema, dataValidator)
export const recipeDataResolver = resolve<Recipe, HookContext<RecipeService>>({})

// Schema for updating existing entries
export const recipePatchSchema = Type.Partial(recipeSchema, {
  $id: 'RecipePatch'
})
export type RecipePatch = Static<typeof recipePatchSchema>
export const recipePatchValidator = getValidator(recipePatchSchema, dataValidator)
export const recipePatchResolver = resolve<Recipe, HookContext<RecipeService>>({})

// Schema for allowed query properties
export const recipeQueryProperties = recipeSchema
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
