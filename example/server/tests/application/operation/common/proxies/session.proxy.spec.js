import { describe, it, expect, beforeEach } from '@jest/globals'
import { 
  Authorizer, Contextor, MemoryStorage, User 
} from '#application/domain/common/index.js'
import { TenantSupplier } from '#application/general/suppliers/index.js'
import { SessionProxy } from '#application/operation/common/proxies/index.js'

describe('SessionProxy', () => {
  let proxy = null

  beforeEach(() => {
    const storage = new MemoryStorage()
    const contextor = new Contextor({ storage })
    const tenantSupplier = new TenantSupplier()
    const authorizer = new Authorizer({ contextor }) 
    proxy = new SessionProxy({ authorizer, tenantSupplier })
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
          email: 'jdoe@knowark.com',
          tenant: 'knowark',
          tenantId: 'T001',
          organization: 'Knowark'
        }
      },
      data: []
    }

    await proxy.proxy(mockMethod)(entry)

    const user = proxy.authorizer.user
    expect(user instanceof User).toBeTruthy()
  })
})
