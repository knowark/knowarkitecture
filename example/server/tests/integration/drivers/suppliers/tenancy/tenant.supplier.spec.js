import { describe, it, expect, beforeEach } from '@jest/globals'
import { 
  TenantSupplier 
} from '#integration/drivers/suppliers/tenancy/index.js'

describe('TenantSupplier', () => {
  let tenantSupplier = null

  beforeEach(() => {
    tenantSupplier = new TenantSupplier()
  })

  it('can be instantiated', () => {
    expect(tenantSupplier).toBeTruthy()
    const repository = tenantSupplier.repository
    expect(repository.constructor.name).toBe('MemoryRepository')
  })

  it('creates a tenant given its id and name', async () => {
    const tid = 'T007'
    const tenant = 'svg'
    const organization = 'Grupo SVG'

    const entity = await tenantSupplier.ensure({ tid, tenant, organization })

    expect(entity.id).toEqual('T007')
    expect(entity.slug).toEqual('svg')
    expect(entity.name).toEqual('Grupo SVG')
  })
})