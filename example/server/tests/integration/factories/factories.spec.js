import { describe, it, expect, beforeEach } from '@jest/globals'
import { Injectark } from '@knowark/injectarkjs'
import { FACTORIES } from '#integration/factories/index.js'

const FACTORY_TESTS = {
  base: [
    ['Portal', 'MemoryPortal'],
    ['StandardInformer', 'StandardInformer'],
    ['StandardManager', 'StandardManager'],
    ['SessionManager', 'SessionManager'],
  ],
  check: [
    ['Portal', 'MemoryPortal'],
  ],
  //json: [
  //],
  //sql: [
  //]
}

describe('Factories', function () {
  it('resolve their resources through the injector', function () {
    for (const [environment, tests] of Object.entries(FACTORY_TESTS)) {
      const config = {}
      const factory = FACTORIES[environment](config)
      const injector = new Injectark({ factory })
      for (const testCase of tests) {
        const resource = injector.resolve(testCase[0])
        expect(resource?.constructor.name).toEqual(testCase[1])
      }
    }
  })
})
