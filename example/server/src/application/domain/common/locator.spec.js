import { describe, it, expect, beforeEach } from '@jest/globals'
import { User, SystemUser } from './authorizer/index.js'
import { Locator, SystemLocator } from './locator.js'

class MockAuthorizer {
  get user () {
    return new User({
      id: 'U001',
      tenantId: 'T001',
      namespace: 'N001'
    })
  }
}

describe('Locator', () => {
  let locator = null

  beforeEach(() => {
    const authorizer = new MockAuthorizer()
    locator = new Locator({ authorizer })
  })

  it('can be instantiated', () => {
    expect(locator).toBeTruthy()
  })

  it('retrieves the location based on the current context', () => {
    const location = locator.location()
    expect(location).toEqual('N001')
  })

  it('retrieves the reference based on the current context', () => {
    const reference = locator.reference()
    expect(reference).toEqual('U001')
  })

  it('provides a system locator', () => {
    const systemLocator = new SystemLocator()
    const systemUser = new SystemUser()
    expect(systemLocator.user instanceof SystemUser).toBeTruthy()
    expect(systemLocator.location()).toEqual(systemUser.namespace)
    expect(systemLocator.reference()).toEqual(systemUser.id)
  })
})
