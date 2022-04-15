import { describe, it, expect, beforeEach } from '@jest/globals'
import { MemoryPortal } from '#application/domain/services'
import { StandardManager } from './standard.manager.js'

describe('StandardManager', () => {
    let manager = null

    beforeEach(() => {
        const portal = new MemoryPortal()
        manager = new StandardManager({
            portal
        })
    })
    
    it('can be instantiated', () => {
        expect(manager).toBeTruthy()
    })

    it('adds items of the given model', async () => {
        const entry = {
            meta: {
                model: 'Course'
            },
            data: [
                { id: 'C001', name: 'Entrepreneurship' }
            ]
        }

        const data = manager.portal.get('Course').storer.data

        await manager.set(entry)

        expect(data['default']['C001'].name).toEqual('Entrepreneurship')
    })

    it('removes items of the given model', async () => {
        let entry = {
            meta: {
                model: 'Lesson'
            },
            data: [
                { id: 'L001', courseId: 'C001', name: 'Journey Design' }
            ]
        }
        const data = manager.portal.get('Lesson').storer.data
        await manager.set(entry)
        expect(data['default']['L001'].name).toEqual('Journey Design')

        entry = {
            meta:{
                model: 'Lesson'
            },
            data: [
                { id: 'L001' }
            ]
        }

        await manager.remove(entry)
        expect(data['default']['C001']).toBeUndefined()
    })
})
