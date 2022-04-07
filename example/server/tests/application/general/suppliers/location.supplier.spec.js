import { describe, it, expect, beforeEach } from '@jest/globals'
import { LocationSupplier } from '#application/general/suppliers/index.js'

class MockContextor {
  constructor(contextor) {
    this.contextor = contextor
  }

  context() {
    return {
      tid: 'T001',
      uid: 'U001'
    }
  }
}

describe('LocationSupplier', () => {
  let locationSupplier = null

  beforeEach(() => {
    const contextor = new MockContextor()
    locationSupplier = new LocationSupplier({ contextor })
  })

  it('can be instantiated', () => {
    expect(locationSupplier).toBeTruthy()
  })

  it('retrieves the location based on the current context', () => {
    const location = locationSupplier.location()
    expect(location).toEqual('T001')
  })

  it('retrieves the reference based on the current context', () => {
    const reference = locationSupplier.reference()
    expect(reference).toEqual('U001')
  })
})
