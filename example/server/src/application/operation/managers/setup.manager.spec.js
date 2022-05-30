import { describe, it, expect, beforeEach } from '@jest/globals'
import {
  MemoryMigrationSupplier
} from '#application/general/suppliers/index.js'
import { SetupManager } from './setup.manager.js'

describe('SetupManager', () => {
  let manager = null

  beforeEach(() => {
    const migrationSupplier = new MemoryMigrationSupplier()
    manager = new SetupManager({ migrationSupplier })
  })

  it('can be instantiated', () => {
    expect(manager).toBeTruthy()
  })

  it('calls the migrate method of its migration supplier', async () => {
    const input = {
      meta: {
        options: {
          tenants: 'all'
        }
      }
    }

    const output = await manager.migrate(input)

    expect(manager.migrationSupplier.options).toEqual({ tenants: 'all' })
    expect(output).toEqual({})
  })
})
