import { describe, it, expect } from '@jest/globals'
import { Injectark } from '@knowark/injectarkjs'
import { config } from '#integration/core/index.js'
import { JsonFactory } from './json.factory.js'

const TEST_CASES = [
  ['TenantRepository', 'JsonTenantRepository'],
  ['Portal', 'JsonPortal']
]

describe('JsonFactory', function () {
  it('resolves their resources through the injector', function () {
    const factory = new JsonFactory(config)
    const injector = new Injectark({ factory })
    for (const testCase of TEST_CASES) {
      const resource = injector.resolve(testCase[0])
      expect(resource?.constructor.name).toEqual(testCase[1])
    }
  })
})
