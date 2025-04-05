// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { hooks as schemaHooks } from '@feathersjs/schema'
import type { Application } from '../../declarations'
import { IngredientService, getOptions } from './ingredient.class'
import {
  ingredientDataResolver,
  ingredientDataValidator,
  ingredientExternalResolver,
  ingredientPatchResolver,
  ingredientPatchValidator,
  ingredientQueryResolver,
  ingredientQueryValidator,
  ingredientResolver
} from './ingredient.schema'

export const ingredientPath = '/api/ingredient'
export const ingredientMethods: Array<keyof IngredientService> = ['find', 'get', 'create', 'patch', 'remove']

export * from './ingredient.class'
export * from './ingredient.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const ingredient = (app: Application) => {
  // Register our service on the Feathers application
  app.use(ingredientPath, new IngredientService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: ingredientMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(ingredientPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(ingredientExternalResolver),
        schemaHooks.resolveResult(ingredientResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(ingredientQueryValidator),
        schemaHooks.resolveQuery(ingredientQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(ingredientDataValidator),
        schemaHooks.resolveData(ingredientDataResolver)
      ],
      patch: [
        schemaHooks.validateData(ingredientPatchValidator),
        schemaHooks.resolveData(ingredientPatchResolver)
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
    [ingredientPath]: IngredientService
  }
}
