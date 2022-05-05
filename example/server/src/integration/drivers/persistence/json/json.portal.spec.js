import { describe, it, expect } from '@jest/globals'
import { JsonPortal } from './json.portal.js'
import * as models from '#application/domain/models/index.js'

describe('JsonPortal', () => {
  let portal = null

  it('can be instantiated', () => {
    portal = new JsonPortal()
    expect(portal).toBeTruthy()
  })

  it('retrieves a repository for each model', () => {
    for (const model of Object.values(models)) {
      const repository = portal.get(model.name)
      expect(repository.constructor.name).toBe('JsonRepository')
      expect(repository.model.name).toBe(model.name)
    }
  })
})
