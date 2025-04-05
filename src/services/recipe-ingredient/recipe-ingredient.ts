// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { hooks as schemaHooks } from '@feathersjs/schema'
import type { Application } from '../../declarations'
import { RecipeIngredientService, getOptions } from './recipe-ingredient.class'
import {
  recipeIngredientDataResolver,
  recipeIngredientDataValidator,
  recipeIngredientExternalResolver,
  recipeIngredientPatchResolver,
  recipeIngredientPatchValidator,
  recipeIngredientQueryResolver,
  recipeIngredientQueryValidator,
  recipeIngredientResolver
} from './recipe-ingredient.schema'

export const recipeIngredientPath = '/api/recipe-ingredient'
export const recipeIngredientMethods: Array<keyof RecipeIngredientService> = [
  'find',
  'get',
  'create',
  'patch',
  'remove'
]

export * from './recipe-ingredient.class'
export * from './recipe-ingredient.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const recipeIngredient = (app: Application) => {
  // Register our service on the Feathers application
  app.use(recipeIngredientPath, new RecipeIngredientService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: recipeIngredientMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(recipeIngredientPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(recipeIngredientExternalResolver),
        schemaHooks.resolveResult(recipeIngredientResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(recipeIngredientQueryValidator),
        schemaHooks.resolveQuery(recipeIngredientQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(recipeIngredientDataValidator),
        schemaHooks.resolveData(recipeIngredientDataResolver)
      ],
      patch: [
        schemaHooks.validateData(recipeIngredientPatchValidator),
        schemaHooks.resolveData(recipeIngredientPatchResolver)
      ],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [recipeIngredientPath]: RecipeIngredientService
  }
}
