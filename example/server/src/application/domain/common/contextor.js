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

  async initialize (method) {
    return await this.storage.run(new Map(), method)
  }
}

export class MemoryStorage {
  constructor(store = new Map()) {
    this._store = store
  }

  getStore () {
    return this._store
  }

  async run (store, callback) {
    this._store = store
    this._callback = callback
    return callback()
  }
}
