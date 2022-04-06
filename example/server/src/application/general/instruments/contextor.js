import { AsyncLocalStorage } from 'async_hooks'

export class Contextor {
  constructor() {
    this.storage = new AsyncLocalStorage()
  }

  context() {
    return this.storage.getStore()
  }

  run(context, method) {
    return this.storage.run(context, method)
  }
}
