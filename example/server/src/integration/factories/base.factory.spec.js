import { describe, it, expect, beforeEach } from '@jest/globals'
import { Injectark } from '@knowark/injectarkjs'
import { BaseFactory } from './base.factory.js'

const TEST_CASES = [
    ['Contextor', 'Contextor'],
    ['Authorizer', 'Authorizer'],
    ['Locator', 'Locator'],
    ['Portal', 'MemoryPortal'],
    ['SessionProxy', 'SessionProxy'],
    ['Wrapper', 'Wrapper'],
    ['StandardInformer', 'StandardInformer'],
    ['StandardManager', 'StandardManager'],
    ['SessionManager', 'SessionManager'],
]

describe('BaseFactory', function () {
  it('resolves their resources through the injector', function () {
    const config = {}
    const factory = new BaseFactory(config)
    const injector = new Injectark({ factory })
    for (const testCase of TEST_CASES) {
      const resource = injector.resolve(testCase[0])
      expect(resource?.constructor.name).toEqual(testCase[1])
    }
  })
})
