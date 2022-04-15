import { describe, it, expect, beforeEach } from '@jest/globals'
import { MemoryPortal } from '#application/domain/services/index.js'
import { StandardInformer } from './standard.informer.js'

describe('StandardInformer', () => {
    let informer = null

    beforeEach(() => {
        const portal = new MemoryPortal()
        informer = new StandardInformer({ portal })
    })
    
    it('can be instantiated', () => {
        expect(informer).toBeTruthy()
    })

    it('searches the models in its portal', async () => {
        const input = {
            meta: {
                model: 'Setting'
            }
        }

        const output = await informer.search(input)

        expect(output).toEqual({ data: [] })
    })
})
