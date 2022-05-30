import { describe, it, expect, beforeEach } from '@jest/globals'
import {
  MigrationSupplier, MemoryMigrationSupplier 
} from './migration.supplier.js'

describe('MigrationSupplier', () => {
  let migrationSupplier = null

  beforeEach(() => {
    migrationSupplier = new MigrationSupplier()
  })

  it('can be instantiated', () => {
    expect(migrationSupplier).toBeTruthy()
  })

  it('has a migrate method', async () => {
    try {
      await migrationSupplier.migrate()
    } catch (error) {
      expect(error.message).toEqual('Not implemented')
    }
  })

  it('is implemented by an in-memory version', async () => {
    migrationSupplier = new MemoryMigrationSupplier()
    expect(migrationSupplier.options).toBeNull()

    const options = { custom: 'data' }
    await migrationSupplier.migrate(options)

    expect(migrationSupplier.options).toBe(options)
  })
})
