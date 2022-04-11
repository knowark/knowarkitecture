import { describe, it, expect, beforeEach } from '@jest/globals'
import { 
  JsonTenantRepository 
} from '#integration/drivers/suppliers/tenancy/index.js'

describe('JsonTenantRepository', () => {
  let repository = null

  beforeEach(() => {
    repository = new JsonTenantRepository()
  })

  it('can be instantiated', () => {
    expect(repository).toBeTruthy()
  })
})
