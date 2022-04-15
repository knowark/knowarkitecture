import { describe, it, expect, beforeEach } from '@jest/globals'
import { Wrapper } from './wrapper.js'

class MockProxy {
  constructor(identifier) {
    this.identifier = identifier
  }

  proxy (method) {
    return async (entry) => {
      entry.meta.proxies.push(this.identifier)
      return await method(entry)
    }
  }
}

class MockOperator {
  async action(entry) {
    return entry
  }
}

describe('Wrapper', () => {
  let wrapper = null

  beforeEach(() => {
    const proxies = [
      new MockProxy(1),
      new MockProxy(2),
      new MockProxy(3),
    ]  
    wrapper = new Wrapper(proxies)
  })

  it('can be instantiated', () => {
    expect(wrapper).toBeTruthy()
  })

  it('wraps a target operator and keeps its constructor name', () => {
    const operator = new MockOperator()
    const wrappedOperator = wrapper.wrap(operator)
    expect(wrappedOperator.constructor.name).toEqual('MockOperator')
  })

  it('wraps a target operator with the provided proxies', async () => {
    const operator = new MockOperator()
    const wrappedOperator = wrapper.wrap(operator)
    const entry = {
      meta: {
        proxies: []
      },
      data: []
    }

    const response = await wrappedOperator.action(entry)

    expect(response).toEqual({
      meta: {
        proxies: [1, 2, 3]
      },
      data: []
    })
  })
})
