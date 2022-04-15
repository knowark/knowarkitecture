import { describe, it, expect, beforeEach } from '@jest/globals'
import { Contextor } from '#application/domain/common/index.js'

class MockContextConsumer {
  constructor(contextor) {
    this.contextor = contextor
  }

  showContext() {
    return this.contextor.context
  }
}

describe('Contextor', () => {
  let contextor = null

  beforeEach(() => {
    contextor = new Contextor()
  })

  it('can be instantiated', () => {
    expect(contextor).toBeTruthy()
  })

  it('create an async local storage instance on instantiation', () => {
    const storage = contextor.storage
    expect(storage.constructor.name).toEqual('AsyncLocalStorage')
  })

  it('can be initialized inside a method chain', async () => {
    const consumer = new MockContextConsumer(contextor)
    let consumedContext = null
    const method = async () => {
      consumedContext = consumer.showContext()
      return consumedContext
    }

    const result = await contextor.initialize(method)

    expect(consumedContext instanceof Map).toBeTruthy()
    expect(result instanceof Map).toBeTruthy()
  })

  it('raises an error if the context has not been initialized', () => {
    expect(() => contextor.context).toThrow(
      'Context has not been initialized')
  })
})
