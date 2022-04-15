import { AsyncLocalStorage } from 'async_hooks'

export class Contextor {
  constructor({ storage = new AsyncLocalStorage() } = {}) {
    this.storage = storage
  }

  get context () {
    const context = this.storage.getStore()
    if (context === undefined) {
      throw new Error('Context has not been initialized')
    }
    return context
  }

  initialize (method) {
    return this.storage.run(new Map(), method)
  }
}
