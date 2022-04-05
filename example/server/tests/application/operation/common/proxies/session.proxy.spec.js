import { describe, it, expect, beforeEach } from '@jest/globals'
import { SessionProxy } from '#application/operation/common/proxies/index.js'

describe('Wrapper', () => {
  let proxy = null

  beforeEach(() => {
    proxy = new SessionProxy()
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
  })
})
