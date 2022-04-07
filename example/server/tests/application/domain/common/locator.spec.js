import { describe, it, expect, beforeEach } from '@jest/globals'
import { Locator } from '#application/domain/common/index.js'

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

describe('Locator', () => {
  let locator = null

  beforeEach(() => {
    const contextor = new MockContextor()
    locator = new Locator({ contextor })
  })

  it('can be instantiated', () => {
    expect(locator).toBeTruthy()
  })

  it('retrieves the location based on the current context', () => {
    const location = locator.location()
    expect(location).toEqual('T001')
  })

  it('retrieves the reference based on the current context', () => {
    const reference = locator.reference()
    expect(reference).toEqual('U001')
  })
})
