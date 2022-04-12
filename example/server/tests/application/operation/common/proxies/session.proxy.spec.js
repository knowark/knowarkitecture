import { describe, it, expect, beforeEach } from '@jest/globals'
import { Authorizer, User } from '#application/domain/common/index.js'
import { SessionProxy } from '#application/operation/common/proxies/index.js'

class MockStorage {
  getStore () {
    return this._store
  }

  run (store, callback) {
    this._store = store
    this._callback = callback
    return callback()
  }
}


describe('SessionProxy', () => {
  let proxy = null

  beforeEach(() => {
    const storage = new MockStorage()
    const authorizer = new Authorizer({ storage }) 
    proxy = new SessionProxy({ authorizer })
  })

  it('can be instantiated', () => {
    expect(proxy).toBeTruthy()
  })

  it('proxies the given method', async () => {
    const mockMethod = async (entry) => entry
    const entry = {
      meta: {
        authorization: {
          id: 'U001',
          name: 'John Doe',
          tenant: 'Knowark',
          tenantId: 'T001'
        }
      },
      data: []
    }

    await proxy.proxy(mockMethod)(entry)

    const store = proxy.authorizer.storage._store
    expect(store.constructor).toBe(User)
  })
})
