export class MigrationSupplier {
  async migrate (options) {
    throw new Error('Not implemented')
  }
}

export class MemoryMigrationSupplier extends MigrationSupplier {
  constructor () {
    super()
    this.options = null
  }

  async migrate (options) {
    this.options = options
  }
}
