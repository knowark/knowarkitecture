import { describe, it, expect, beforeEach } from '@jest/globals'
import { Contextor } from '#application/domain/common/index.js'
import { ContextProxy } from '#application/operation/common/proxies/index.js'

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


describe('ContextProxy', () => {
  let proxy = null

  beforeEach(() => {
    const storage = new MockStorage()
    const contextor = new Contextor({ storage })

    proxy = new ContextProxy({ contextor })
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

    await proxy.proxy(mockMethod)(entry)

    const store = proxy.contextor.storage._store
    expect(store instanceof Map).toBeTruthy()
  })
})
