import { AsyncLocalStorage } from 'async_hooks'
import { User } from './user.js'

export class Authorizer {
  constructor () {
    this.storage = new AsyncLocalStorage()
  }

  get user () {
    return this.storage.getStore()
  }

  enter (user, action) {
    if (user.constructor !== User) {
      throw new Error('Please provide a "User" instance')
    }
    return this.storage.run(user, action)
  }
}
