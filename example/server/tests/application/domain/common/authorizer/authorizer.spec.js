import { describe, it, expect, beforeEach } from '@jest/globals'
import {
  Authorizer, User
} from '#application/domain/common/authorizer/index.js'

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
    authorizer = new Authorizer()
  })

  it('can be instantiated', () => {
    expect(authorizer).toBeTruthy()
  })

  it('create an async local storage instance on instantiation', () => {
    const storage = authorizer.storage
    expect(storage.constructor.name).toEqual('AsyncLocalStorage')
  })

  it('establishes the execution user for the application', () => {
    const consumer = new MockAuthorizerConsumer(authorizer)
    const user = new User({ 
      id: 'U001', name: 'John Doe',
      tenantId: 'T001', tenant: 'knowark'
    })
    let consumedUser = null
    const action = async () => {
      consumedUser = consumer.showUser()
      return consumedUser
    }

    authorizer.enter(user, action)

    expect(consumedUser).toBe(user)
  })

  it('establishes the execution user for the application', () => {
    const consumer = new MockAuthorizerConsumer(authorizer)
    const user = new User({ 
      id: 'U001', name: 'John Doe',
      tenantId: 'T001', tenant: 'knowark'
    })
    let consumedUser = null
    const action = async () => {
      consumedUser = consumer.showUser()
      return consumedUser
    }

    authorizer.enter(user, action)

    expect(consumedUser).toBe(user)
  })

  it('raises an error if an invalid user is provided', () => {
    const object = { 
      id: 'U001', name: 'John Doe',
      tenantId: 'T001', tenant: 'knowark'
    }

    const action = async () => {}

    expect(() => authorizer.enter(
      object, action)).toThrowError('Please provide a "User" instance')
  })
})
