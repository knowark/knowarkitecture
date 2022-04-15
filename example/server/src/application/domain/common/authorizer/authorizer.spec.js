import { describe, it, expect, beforeEach } from '@jest/globals'
import { User } from './user.js'
import { Authorizer } from './authorizer.js'
import { Contextor, MemoryStorage } from '../contextor.js'

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
