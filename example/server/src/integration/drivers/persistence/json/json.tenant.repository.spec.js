import { describe, it, expect, beforeEach } from '@jest/globals'
import { JsonTenantRepository } from './json.tenant.repository.js'

describe('JsonTenantRepository', () => {
  let repository = null

  beforeEach(() => {
    repository = new JsonTenantRepository()
  })

  it('can be instantiated', () => {
    expect(repository).toBeTruthy()
  })
})
