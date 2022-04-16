import { describe, it, expect } from '@jest/globals'
import { MemoryRepository } from '@knowark/modelark/lib/repository/index.js'
import { MemoryTenantRepository } from './tenant.repository.js'
import { Tenant } from './tenant.js'

describe('TenantRepository', () => {
  it('can be instantiated', () => {
    const repository = new MemoryTenantRepository()

    expect(repository instanceof MemoryRepository).toBeTruthy()
    expect(repository.model).toBe(Tenant)
  })
})
