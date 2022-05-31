export class SetupManager {
  constructor({ migrationSupplier }) {
    this.migrationSupplier = migrationSupplier 
  }

  async migrate (input) {
    const { meta } = input
    await this.migrationSupplier.migrate(meta.options)
    return {}
  }
}
