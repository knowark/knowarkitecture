import { describe, it, expect, beforeEach } from '@jest/globals'
import { Tenant } from './tenant.js'

describe('Tenant', () => {
  let tenant = null

  beforeEach(() => {
    tenant = new Tenant({
      id: 'T001',
      name: 'Knowark',
      slug: 'knowark',
      namespace: 'T001'
    })
  })

  it('can be instantiated', () => {
    expect(tenant).toBeTruthy()
  })

  it('can define its attributes', () => {
    expect(tenant.id).toEqual('T001')
    expect(tenant.name).toEqual('Knowark')
    expect(tenant.slug).toEqual('knowark')
    expect(tenant.namespace).toEqual('T001')
  })

  it('defines default attributes', () => {
    tenant = new Tenant()
    expect(tenant.id.length > 0).toBeTruthy()
    expect(tenant.name).toEqual('')
    expect(tenant.slug).toEqual('')
    expect(tenant.namespace).toEqual('')
  })
})
