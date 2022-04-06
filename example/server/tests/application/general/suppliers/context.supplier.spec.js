import { describe, it, expect, beforeEach } from '@jest/globals'
import { ContextSupplier } from '#application/general/suppliers/index.js'

class MockContextConsumer {
  constructor(contextSupplier) {
    this.contextSupplier = contextSupplier
  }

  showContext() {
    const context = this.contextSupplier.context()
    context.consumed = true
    return context
  }
}

describe('ContextSupplier', () => {
  let contextSupplier = null

  beforeEach(() => {
    contextSupplier = new ContextSupplier()
  })

  it('can be instantiated', () => {
    expect(contextSupplier).toBeTruthy()
  })

  it('create an async local storage instance on instantiation', () => {
    const storage = contextSupplier.storage
    expect(storage.constructor.name).toEqual('AsyncLocalStorage')
  })

  it('establishes the execution context for the application', () => {
    const consumer = new MockContextConsumer(contextSupplier)
    const context = { id: 'I001', tid: 'T001', consumed: false }
    let consumedContext = null
    const method = async () => {
      consumedContext = consumer.showContext()
      return consumedContext
    }

    contextSupplier.run(context, method)

    expect(consumedContext).toEqual({
      id: 'I001', tid: 'T001', consumed: true })
  })
})
