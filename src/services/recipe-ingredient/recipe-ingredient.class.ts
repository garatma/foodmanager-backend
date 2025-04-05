// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import type { KnexAdapterOptions, KnexAdapterParams } from '@feathersjs/knex'
import { KnexService } from '@feathersjs/knex'
import type { Application } from '../../declarations'
import type {
  RecipeIngredient,
  RecipeIngredientData,
  RecipeIngredientPatch,
  RecipeIngredientQuery
} from './recipe-ingredient.schema'

export type { RecipeIngredient, RecipeIngredientData, RecipeIngredientPatch, RecipeIngredientQuery }

export interface RecipeIngredientParams extends KnexAdapterParams<RecipeIngredientQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class RecipeIngredientService<
  ServiceParams extends Params = RecipeIngredientParams
> extends KnexService<
  RecipeIngredient,
  RecipeIngredientData,
  RecipeIngredientParams,
  RecipeIngredientPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('sqliteClient'),
    name: 'recipe-ingredient',
    multi: ['create', 'patch']
  }
}
