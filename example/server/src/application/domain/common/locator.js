import { Locator as Locator_ } from '@knowark/modelark/lib/common/index.js'

export class Locator extends Locator_ {
  constructor({ authorizer }) {
    super()
    this.authorizer = authorizer
  }

  location () {
    const location = this.authorizer.user.tenantId
    return location
  }

  reference () {
    const reference = this.authorizer.user.id
    return reference
  }
}
