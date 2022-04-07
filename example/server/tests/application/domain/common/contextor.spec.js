import { describe, it, expect, beforeEach } from '@jest/globals'
import { Contextor } from '#application/domain/common/index.js'

class MockContextConsumer {
  constructor(contextor) {
    this.contextor = contextor
  }

  showContext() {
    const context = this.contextor.context()
    context.consumed = true
    return context
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

  it('establishes the execution context for the application', () => {
    const consumer = new MockContextConsumer(contextor)
    const context = { id: 'I001', tid: 'T001', consumed: false }
    let consumedContext = null
    const method = async () => {
      consumedContext = consumer.showContext()
      return consumedContext
    }

    contextor.run(context, method)

    expect(consumedContext).toEqual({
      id: 'I001', tid: 'T001', consumed: true })
  })
})
