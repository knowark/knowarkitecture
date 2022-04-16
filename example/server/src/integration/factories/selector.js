import { BaseFactory } from './base.factory.js'
import { CheckFactory } from './check.factory.js'
import { JsonFactory } from './json.factory.js'

export function selector () {
  return {
    base: (config) => new BaseFactory(config),
    check: (config) => new CheckFactory(config),
    json: (config) => new JsonFactory(config),
  }
}
