import { describe, it, expect, beforeEach } from '@jest/globals'
import { 
  JsonTenantRepository 
} from '#integration/drivers/persistence/json/index.js'

describe('JsonTenantRepository', () => {
  let repository = null

  beforeEach(() => {
    repository = new JsonTenantRepository()
  })

  it('can be instantiated', () => {
    expect(repository).toBeTruthy()
  })
})
