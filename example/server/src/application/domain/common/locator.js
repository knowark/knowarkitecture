import { Locator as Locator_ } from '@knowark/modelark/lib/common/index.js'

export class Locator extends Locator_ {
  constructor({ contextor }) {
    super()
    this.contextor = contextor
  }

  location() {
    const location = this.contextor.context().tid
    return location
  }

  reference() {
    const reference = this.contextor.context().uid
    return reference
  }
}
