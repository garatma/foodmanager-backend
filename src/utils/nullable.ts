import { TSchema, Type } from '@feathersjs/typebox'

export const Nullable = <T extends TSchema>(type: T) => {
  return Type.Optional(Type.Union([type, Type.Null(), Type.Undefined()]))
}
