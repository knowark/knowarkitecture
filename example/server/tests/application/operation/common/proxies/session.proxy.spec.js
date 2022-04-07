import { describe, it, expect, beforeEach } from '@jest/globals'
import { SessionProxy } from '#application/operation/common/proxies/index.js'

class MockContextor {
  context() {
    return {
      tid: 'T001',
      uid: 'U001'
    }
  }

  run(context, method) {
    this._context = context
    this._method = method
    return method()
  }
}

describe('SessionProxy', () => {
  let proxy = null

  beforeEach(() => {
    const contextor = new MockContextor() 
    proxy = new SessionProxy({ contextor })
  })

  it('can be instantiated', () => {
    expect(proxy).toBeTruthy()
  })

  it('proxies the given method', async () => {
    const mockMethod = async (entry) => entry
    const entry = {
      meta: {},
      data: []
    }

    const response = await proxy.proxy(mockMethod)(entry)

    expect(response).toEqual({
      meta: { proxy: true },
      data: []
    })
    expect(proxy.contextor._context).toEqual({
      tid: 'default',
      uid: 'default'
    })
  })
})
