import { describe, it, expect, beforeEach } from '@jest/globals'
import { Injectark } from '@knowark/injectarkjs'
import { FACTORIES } from 'integration/factories'

const FACTORY_TESTS = {
  base: [
    ['QueryService', 'MemoryQueryService'],
    ['AuthService', 'MemoryAuthService'],
    ['MediaService', 'MemoryMediaService'],
    ['IdentifierService', 'MemoryIdentifierService'],
    ['TemposInformer', 'StandardTemposInformer'],
    ['ContactManager', 'ContactManager'],
    ['ProductManager', 'ProductManager'],
    ['OrderManager', 'OrderManager'],
    ['AddressManager', 'AddressManager'],
    ['SessionManager', 'SessionManager'],
    ['UploadManager', 'UploadManager'],
    ['Router', 'Routark']
  ],
  check: [
    ['QueryService', 'MockQueryService']
  ],
  http: [
    ['AuthService', 'HttpAuthService'],
    ['MediaService', 'HttpMediaService'],
    ['IdentifierService', 'CryptoIdentifierService'],
    ['QueryService', 'ApiQueryService'],
    ['IdentitySupplier', 'OauthIdentitySupplier']
  ]
}

describe('Factories', function () {
  it('resolve their resources through the injector', function () {
    for (const [environment, tests] of Object.entries(FACTORY_TESTS)) {
      const config = {}
      const factory = FACTORIES[environment](config)
      const injector = new Injectark({ factory })
      for (const testCase of tests) {
        const resource = injector.resolve(testCase[0])
        expect(resource.constructor.name).toEqual(testCase[1])
      }
    }
  })
})
