import { Locator } from '@knowark/modelark/lib/common/index.js'

export class LocationSupplier extends Locator {
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
