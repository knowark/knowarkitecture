import { Locator as Locator_ } from '@knowark/modelark/lib/common/index.js'
import { SystemUser } from './authorizer/index.js'

export class Locator extends Locator_ {
  constructor({ authorizer }) {
    super()
    this.authorizer = authorizer
  }

  location () {
    return this.authorizer.user.namespace
  }

  reference () {
    return this.authorizer.user.id
  }
}

export class SystemLocator extends Locator_ {
  constructor () {
    super()
    this.user = new SystemUser()
  }

  location () {
    return this.user.namespace
  }

  reference () {
    return this.user.id
  }
}
