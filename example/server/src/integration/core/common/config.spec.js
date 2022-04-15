import { describe, it, expect } from '@jest/globals'
import { config } from './config.js'

describe('Config', () => {
  it('can be instantiated', () => {
    expect(config).toBeTruthy()
  })
})
