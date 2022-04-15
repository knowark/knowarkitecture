import { jest, describe, it, expect, beforeEach } from '@jest/globals'
import { Contextor } from '#application/domain/common/index.js'
import { ContextProxy } from './context.proxy.js'

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

  it('throws on any error inside the method chain', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
    const mockMethod = async (input) => { throw new Error('Any Error') }
    const input = {
      meta: {},
      data: []
    }

    let catched = false
    try {
      await proxy.proxy(mockMethod)(input)
    } catch (error) {
      catched = true
      expect(error.message).toEqual('Any Error')
    }

    expect(catched).toBeTruthy()
    console.error.mockRestore()
  })
})
