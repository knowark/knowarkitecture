import { describe, it, expect } from '@jest/globals'
import { Injectark } from '@knowark/injectarkjs'
import { config } from '#integration/core/index.js'
import { BaseFactory } from './base.factory.js'

const TEST_CASES = [
    ['Contextor', 'Contextor'],
    ['Authorizer', 'Authorizer'],
    ['Locator', 'Locator'],
    ['Portal', 'MemoryPortal'],
    ['TenantRepository', 'MemoryTenantRepository'],
    ['SessionProxy', 'SessionProxy'],
    ['TenantSupplier', 'TenantSupplier'],
    ['MigrationSupplier', 'MemoryMigrationSupplier'],
    ['Wrapper', 'Wrapper'],
    ['StandardInformer', 'StandardInformer'],
    ['StandardManager', 'StandardManager'],
    ['SetupManager', 'SetupManager'],
]

describe('BaseFactory', function () {
  it('resolves their resources through the injector', function () {
    const factory = new BaseFactory(config)
    const injector = new Injectark({ factory })
    for (const testCase of TEST_CASES) {
      const resource = injector.resolve(testCase[0])
      expect(resource?.constructor.name).toEqual(testCase[1])
    }
  })
})
