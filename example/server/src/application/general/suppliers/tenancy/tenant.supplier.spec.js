import { describe, it, expect, beforeEach } from '@jest/globals'
import { TenantSupplier } from './tenant.supplier.js'

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
    const tenantId = 'T007'
    const tenant = 'svg'
    const organization = 'Grupo SVG'

    const entity = await tenantSupplier.ensure(
      { tenantId, tenant, organization })

    expect(entity.id).toEqual('T007')
    expect(entity.slug).toEqual('svg')
    expect(entity.name).toEqual('Grupo SVG')
  })

  it('retrieves a tenant if it already exists', async () => {
    const tenantId = 'T007'
    const tenant = 'svg'
    const organization = 'Grupo SVG'

    let entity = await tenantSupplier.ensure(
      { tenantId, tenant, organization })
    entity = await tenantSupplier.ensure(
      { tenantId, tenant, organization })

    expect(entity.id).toEqual('T007')
    expect(entity.slug).toEqual('svg')
    expect(entity.name).toEqual('Grupo SVG')
    expect(entity.namespace).toEqual('T007')
  })
})
