import { BaseFactory } from './base.factory.js'
//import { CheckFactory } from './check.factory.js'
//import { HttpFactory } from './http.factory.js'

export const FACTORIES = {
  base: (config) => new BaseFactory(config),
  //check: (config) => new CheckFactory(config),
  //http: (config) => new HttpFactory(config)
}
