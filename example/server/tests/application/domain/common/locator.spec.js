import { describe, it, expect, beforeEach } from '@jest/globals'
import { Locator, User } from '#application/domain/common/index.js'

class MockAuthorizer {
  get user () {
    return new User({
      id: 'U001',
      tenantId: 'T001'
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
    expect(location).toEqual('T001')
  })

  it('retrieves the reference based on the current context', () => {
    const reference = locator.reference()
    expect(reference).toEqual('U001')
  })
})
