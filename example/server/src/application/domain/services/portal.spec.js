import { describe, it, expect, beforeEach } from '@jest/globals'
import { Portal, MemoryPortal } from '#application/domain/services/portal.js'
import * as models from '#application/domain/models'

describe('Portal', () => {
    let portal = null

    beforeEach(() => {
        portal = new Portal()
    })
    
    it('can be instantiated', () => {
      expect(portal).toBeTruthy()
    })
})

describe('MemoryPortal', () => {
    let portal = null

    beforeEach(() => {
        portal = new MemoryPortal()
    })
    
    it('can be instantiated', () => {
      expect(portal).toBeTruthy()
    })

    it('retrieves a repository for each model', () => {
        for (const model of Object.values(models)) {
            const repository = portal.get(model.name)
            expect(repository.constructor.name).toBe('MemoryRepository')
            expect(repository.model.name).toBe(model.name)
        }
    })
})
