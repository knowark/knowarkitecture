import { describe, it, expect } from '@jest/globals'
import { JsonRepository } from '@knowark/modelark/lib/repository/index.js'
import { Tenant } from '#application/general/suppliers/tenancy/index.js'
import { JsonTenantRepository } from './json.tenant.repository.js'

describe('JsonTenantRepository', () => {
  it('can be instantiated', () => {
    const repository = new JsonTenantRepository()
    expect(repository).toBeTruthy()

    expect(repository instanceof JsonRepository).toBeTruthy()
    expect(repository.model).toBe(Tenant)
  })
})
