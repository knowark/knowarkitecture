import { grab } from '@knowark/validarkjs/lib/index.js'
import { Contextor } from '../contextor.js'
import { User } from './user.js'

export class Authorizer {
  constructor (dependencies) {
    this.contextor = grab(dependencies, Contextor)
  }

  get user () {
    return this.contextor.context.get('user')
  }

  set user (value) {
    if (!(value instanceof User)) {
      throw new Error(
        `Value should be a "User" instance. Got "${typeof value}"`)
    }

    return this.contextor.context.set('user', value)
  }
}
