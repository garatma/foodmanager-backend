// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import type { KnexAdapterOptions, KnexAdapterParams } from '@feathersjs/knex'
import { KnexService } from '@feathersjs/knex'
import type { Application } from '../../declarations'
import type { Ingredient, IngredientData, IngredientPatch, IngredientQuery } from './ingredient.schema'

export type { Ingredient, IngredientData, IngredientPatch, IngredientQuery }

export interface IngredientParams extends KnexAdapterParams<IngredientQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class IngredientService<ServiceParams extends Params = IngredientParams> extends KnexService<
  Ingredient,
  IngredientData,
  IngredientParams,
  IngredientPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('sqliteClient'),
    name: 'ingredient'
  }
}
