import { describe, it, expect, beforeEach } from '@jest/globals'
import {
  Contextor, MemoryStorage, Authorizer, User
} from '#application/domain/common/index.js'

class MockAuthorizerConsumer {
  constructor(authorizer) {
    this.authorizer = authorizer
    this.user = null
  }

  showUser () {
    return this.authorizer.user
  }
}

describe('Authorizer', () => {
  let authorizer = null

  beforeEach(() => {
    const storage = new MemoryStorage()
    const contextor = new Contextor({ storage })
    authorizer = new Authorizer({ contextor })
  })

  it('can be instantiated', () => {
    expect(authorizer).toBeTruthy()
  })

  it('establishes the execution user for the application', () => {
    const user = new User({ 
      id: 'U001', name: 'John Doe',
      tenantId: 'T001', tenant: 'knowark'
    })

    authorizer.user = user

    expect(authorizer.user).toBe(user)
  })

  it('raises an error if an invalid user is provided', () => {
    const object = { 
      id: 'U001', name: 'John Doe',
      tenantId: 'T001', tenant: 'knowark'
    }

    expect(() => { authorizer.user = object }).toThrowError(
      'Value should be a "User" instance. Got "object"')
  })
})
